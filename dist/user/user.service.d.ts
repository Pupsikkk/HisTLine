import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
export declare class UserService {
    private userRepository;
    constructor(userRepository: typeof User);
    getUser(id: number): Promise<User>;
    getAllUsers(): Promise<User[]>;
    addUser(newPotentialUser: CreateUserDto): Promise<User>;
    updateUser(updatingUser: CreateUserDto): Promise<void>;
    deleteUser(candidateForDeleting: CreateUserDto): Promise<void>;
}
