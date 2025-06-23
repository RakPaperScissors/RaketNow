import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").Users>;
    findAll(): Promise<import("./entities/user.entity").Users[]>;
    findOne(id: string): Promise<import("./entities/user.entity").Users | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").Users>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
