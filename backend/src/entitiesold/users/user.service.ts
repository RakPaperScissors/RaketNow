import { Injectable } from "@nestjs/common";
import { InjectableOptions } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) {}
}