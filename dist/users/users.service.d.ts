import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly filePath;
    createUser(user: CreateUserDto): Promise<void>;
    findAll(): Promise<any>;
    findById(id: string): Promise<any>;
    deleteById(id: string): Promise<void>;
}
