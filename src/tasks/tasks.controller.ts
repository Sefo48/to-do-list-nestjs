import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

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

    await this.tasksService.deleteByEmail(email);
    return { message: "Item deleted successfully" };
  }
}
