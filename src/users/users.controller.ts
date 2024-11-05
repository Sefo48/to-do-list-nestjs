import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    const data = await this.usersService.findAll();
    return {data};
  }
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
    return { message: 'User created'};
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this.usersService.findById(id)
    
    if (!user) {
      return { message: "Item not found" };
    }

    await this.usersService.deleteById(id);
    return { message: "Item deleted successfully" }
  }
}
