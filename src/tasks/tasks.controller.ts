import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Query('field') fieldName: string, @Query('value') fieldValue: string) {
    const data = await this.tasksService.findByEmail(fieldName, fieldValue); 
    console.log(data)
    return {data};
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createTaskDto: CreateTaskDto) {
    await this.tasksService.createTask(createTaskDto);
    return { message: 'Task created'};
  }

  @Delete()
  async deleteAll(@Query('field') fieldName: string, @Query('value') fieldValue: string) {
    const task = await this.tasksService.findByEmail(fieldName, fieldValue);
    
    if (!task) {
      return { message: "Item not found" };
    }

    await this.tasksService.deleteByEmail(fieldName, fieldValue);
    return { message: "Item deleted successfully" };
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    await this.tasksService.deleteById(id);
    return { message: 'Item deleted successfully' }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async patchField(@Param('id') id: string, @Body() body: { text: string; isCheck: boolean }) {
    const updatedTask = await this.tasksService.patchTask(Number(id), body);
    console.log(updatedTask)
    return updatedTask
  }

  @Post(':id/media')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {

    await this.tasksService.updateTaskImage(file, Number(id)); 
    return { message: 'Image uploaded successfully'};
  }

  @Get(':id/media')
  async getMedia(@Param('id') id: string) {
    const tasks = await this.tasksService.findAll();
    const task = tasks.find(task => task.id === Number(id));

    if (!task || !task.imageUrl) {
      return { message: 'Image not found' }; 
    }

    return { imageUrl: task.imageUrl }; 
  }
}
