import { Injectable } from '@nestjs/common';
import {promises as fs} from 'fs'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly filePath = 'data.json';

  async createUser(user: CreateUserDto): Promise<void> {
    let users = [];
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      users = JSON.parse(data);
    } catch (error) {
      throw new Error(error)
    }

    users.push(user);
    await fs.writeFile(this.filePath, JSON.stringify(users));
  }

  async findAll(): Promise<any> {
    try{
      const data = await fs.readFile(this.filePath, 'utf-8')
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<any> {
    const users = await this.findAll();
    return users.find(user => user.id === id);
  }

  async deleteById(id: string): Promise<void> {
    const users = await this.findAll();
    const updatedUsers = users.filter(user => user.id !== id);
    await fs.writeFile(this.filePath, JSON.stringify(updatedUsers));
  }
}