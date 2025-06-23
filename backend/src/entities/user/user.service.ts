import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly users: Repository<Users>){

  }
  async createUser(CreateUserDto: CreateUserDto){
    const user = this.users.create(CreateUserDto);

    return await this.users.save(user)

  }

  async findAll() {
    return await this.users.find()  ;
  }

  async findOne(uid: number) {
    return await this.users.findOne({where: {uid}});
  }

  async patch(uid: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.findOne( uid);
    
    if (!findUser){
      throw new NotFoundException()
    }

    Object.assign(findUser, updateUserDto);
    return await this.users.save(findUser);
  }

  async remove(uid: number) {
    const findUser = await this.findOne(uid);
    
    if (!findUser){
      throw new NotFoundException()
    }
    else{
      return await this.users.delete(uid)
    }
  }

  
}
