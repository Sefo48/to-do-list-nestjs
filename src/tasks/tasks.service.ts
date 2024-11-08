import { HttpException, Injectable } from '@nestjs/common';
import { promises as fs } from 'fs'
import { CreateTaskDto } from './dto/create-task.dto';
import { BADRESP } from 'dns/promises';


@Injectable()
export class TasksService {
  private readonly filePath = './data/task.json';

  async createTask(createTaskDto: CreateTaskDto) {
    let tasks = [];
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      tasks = JSON.parse(data);
    } catch (error) {
      throw new Error(error)
    }

    tasks.push(createTaskDto);
    await fs.writeFile(this.filePath, JSON.stringify(tasks));
  }

  async findAll() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8')
      return JSON.parse(data);
    } catch (error) {
      throw new HttpException(BADRESP, 400);
    }
  }

  async findByEmail(fieldName: string, fieldValue: string) {
    const tasks = await this.findAll();
    return tasks.filter(task => task[fieldName] === fieldValue);
  }

  async deleteByEmail(email: string) {
    const tasks = await this.findAll();
    const updatedTasks = tasks.filter(task => task.email !== email);
    await fs.writeFile(this.filePath, JSON.stringify(updatedTasks));
  }

  async deleteById(id: string) {

  }

  async patchStatus(id: string) {

  }

  async patchText(id: string) {

  }
}
