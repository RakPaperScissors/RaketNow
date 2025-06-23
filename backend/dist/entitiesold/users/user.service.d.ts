import { Repository } from "typeorm";
import { Users } from "./user.entity";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<Users>);
}
