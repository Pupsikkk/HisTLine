import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): Promise<User[]>;
    getOne(id: number): Promise<User>;
    createUser(body: CreateUserDto): Promise<User>;
    updateUser(body: CreateUserDto): Promise<void>;
    deleteUser(body: CreateUserDto): Promise<void>;
}
