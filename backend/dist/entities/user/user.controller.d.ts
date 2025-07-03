import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userRole } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").Users>;
    findAll(): Promise<import("./entities/user.entity").Users[]>;
    findOne(id: string): Promise<import("./entities/user.entity").Users | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").Users>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    searchByName(name: string): Promise<import("./entities/user.entity").Users[]>;
    searchByEmail(email: string): Promise<import("./entities/user.entity").Users[]>;
    filterByRole(role: userRole): Promise<import("./entities/user.entity").Users[]>;
    changeRole(uid: number, role: userRole): Promise<import("./entities/user.entity").Users>;
    updateProfilePicture(uid: number, profilePicture: string): Promise<import("./entities/user.entity").Users>;
}
