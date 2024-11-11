import { HttpException, Injectable } from '@nestjs/common';
import { promises as fs } from 'fs'
import { CreateTaskDto } from './dto/create-task.dto';
import { BADRESP } from 'dns/promises';
import { S3Service } from 'src/s3/s3.service';


@Injectable()
export class TasksService {
  constructor( private s3Service: S3Service) {}

  private readonly filePath = './data/task.json';

  async createTask(createTaskDto: CreateTaskDto) {
    let tasks = [];
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      tasks = JSON.parse(data);
    } catch (error) {
      throw new HttpException(BADRESP, 400)
    }

    tasks.push(createTaskDto);
    await fs.writeFile(this.filePath, JSON.stringify(tasks));
  }

  async findAll() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8')
      return JSON.parse(data);
    } catch (error) {
      throw new HttpException(BADRESP, 500);
    }
  }

  async findByEmail(fieldName: string, fieldValue: string) {
    try {
      const tasks = await this.findAll();
      return tasks.filter(task => task[fieldName] === fieldValue);
    } catch (error) {
      throw new HttpException(BADRESP, 500);
    }
  }

  async deleteByEmail(fieldName: string, fieldValue: string) {
    try {
      const tasks = await this.findAll();
      const updatedTasks = tasks.filter(task => task[fieldName] !== fieldValue);
      await fs.writeFile(this.filePath, JSON.stringify(updatedTasks));
    } catch (error) {
      throw new HttpException(BADRESP, 400);
    }
  }

  async deleteById(id: number) {
    try {
      const tasks = await this.findAll();
      const updatedTasks = tasks.filter(task => task.id !== Number(id));
      await fs.writeFile(this.filePath, JSON.stringify(updatedTasks));
    } catch (error) {
      throw new HttpException(BADRESP, 400);
    }
  }

  async patchTask(id: number, updates: Partial<{text: string; isCheck: boolean}> ) {
    const tasks = await this.findAll();
    const tasksValue = tasks.find(task => task.id === id);
    
    if (tasksValue === -1) {
      return { message: 'Task not found' };
    }

    if(updates.text) {
      tasksValue.text = updates.text;
    }

    if(updates.isCheck) {
      tasksValue.isCheck = updates.isCheck;
    }
    
    await fs.writeFile(this.filePath, JSON.stringify(tasks));
    return tasksValue
  }

  async updateTaskImage(file: Express.Multer.File, id: number) {
    const tasks = await this.findAll();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return null; 
    }

    const key = `${file.fieldname}${Date.now()}`
    const imageUrl = await this.s3Service.uploadFile(file, key)
    tasks[taskIndex].imageUrl = imageUrl; 

    await fs.writeFile(this.filePath, JSON.stringify(tasks));
    return tasks[taskIndex]; 
  }
}
