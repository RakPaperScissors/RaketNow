import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { userRole } from './entities/user.entity';
export declare class UserService {
    private readonly users;
    constructor(users: Repository<Users>);
    createUser(CreateUserDto: CreateUserDto): Promise<Users>;
    findAll(): Promise<Users[]>;
    findOne(uid: number): Promise<Users | null>;
    patch(uid: number, updateUserDto: UpdateUserDto): Promise<Users>;
    remove(uid: number): Promise<import("typeorm").DeleteResult>;
    searchByName(name: string): Promise<Users[]>;
    searchByEmail(email: string): Promise<Users[]>;
    filterByRole(role: userRole): Promise<Users[]>;
    changeRole(uid: number, role: userRole): Promise<Users>;
}
