import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userRole } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly users: Repository<Users>){
  }

  // Basic CRUD operations for USER entity
  // 1. Create User
  async createUser(CreateUserDto: CreateUserDto){ 
    const user = this.users.create(CreateUserDto);

    return await this.users.save(user)
  }
  // 2. Get all users
  async findAll() {
    return await this.users.find();
  }
  // 3. Get user by uid
  async findOne(uid: number) {
    return await this.users.findOne({where: {uid}});
  }
  // 4. Update user by uid
  async patch(uid: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.findOne(uid);
    
    if (!findUser){
      throw new NotFoundException();
    }

    Object.assign(findUser, updateUserDto);
    return await this.users.save(findUser);
  }
  // 5. Delete user by uid
  async remove(uid: number) {
    const findUser = await this.findOne(uid);
    
    if (!findUser){
      throw new NotFoundException();
    }
    else{
      return await this.users.delete(uid);
    }
  }

  // Search and Filter functions
  // 1. Search by name
  async searchByName(name: string) {
    return await this.users.find({ where: { name: ILike(`%${name}%`) } });
  }
  // 2. Search by email
  async searchByEmail(email: string) {
    return await this.users.find({ where: { email: ILike(`%${email}%`) } });
  }
  // 3. Filter by role
  async filterByRole(role: userRole) {
    return await this.users.find({ where: { role } });
  }
  // 4. Filter by skills

  // User profile and role management
  // 1. Get current user profile
  // 2. Update profile picture or bio
  // 3. Set or Change role (admin only)
  async changeRole(uid:number, role: userRole) {
    const findUser = await this.findOne(uid);

    if(!findUser) {
      throw new NotFoundException('User not found');
    }
    findUser.role = role;
    return await this.users.save(findUser);
  }
}
