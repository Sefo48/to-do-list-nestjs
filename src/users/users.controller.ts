import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const data = await this.usersService.findAll();
    return {data};
  }
  
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
    return { message: 'User created'};
  }

  @Delete(':email')
  async delete(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      return { message: "Item not found" };
    }

    await this.usersService.deleteByEmail(email);
    return { message: "Item deleted successfully" };
  }
}
