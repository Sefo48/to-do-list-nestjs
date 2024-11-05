import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        data: any;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
