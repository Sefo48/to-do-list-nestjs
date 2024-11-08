import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly filePath = './data/user.json';

  async createUser(user: CreateUserDto) {
    let users = [];
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      users = JSON.parse(data);
    } catch (error) {
      throw new Error(error)
    }

    users.push(user);
    await fs.writeFile(this.filePath, JSON.stringify(users));
    return users;
  }

  async findAll() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8')
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByEmail(email: string) {
    const users = await this.findAll();
    return users.find(user => user.email === email);
  }

  async deleteByEmail(email: string) {
    const users = await this.findAll();
    const updatedUsers = users.filter(user => user.email !== email);
    await fs.writeFile(this.filePath, JSON.stringify(updatedUsers));
  }
}