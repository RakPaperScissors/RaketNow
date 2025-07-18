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

  // --- Basic CRUD operations for USER entity ---
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
    // Find user by uid
    const findUser = await this.findOne(uid);
    // Check if user exists
    if (!findUser){
      throw new NotFoundException('User not found');
    }
    // Update user details based on input
    Object.assign(findUser, updateUserDto);
    return await this.users.save(findUser);
  }

  // 5. Delete user by uid
  async remove(uid: number) {
    // Find user by uid
    const findUser = await this.findOne(uid);
    if (!findUser){
      // Throw not found exception if user is not found
      throw new NotFoundException('User not found');
    } else {
      // Delete user if found
      return await this.users.delete(uid);
    }
  }

  // --- Search and Filter functions ---
  // 1. Search by name
  async searchByName(name: string) {
    // Finds user by name using ILike for incomplete search (only first name etc.)
    return await this.users.find({ 
      where: [
        { firstName: ILike(`%${name}%`) },
        { lastName: ILike(`%${name}%`) }
      ]
    });
  }

  // 2. Search by email
  async searchByEmail(email: string) {
    // Finds user by email using ILike for incomplete search (only part of email)
    return await this.users.find({ where: { email: ILike(`%${email}%`) } });
  }

  // 3. Filter by role
  async filterByRole(role: userRole) {
    // Gets all users with specified role
    return await this.users.find({ 
      where: { role },
      relations: ['raketistaSkills', 'raketistaSkills.skill']
    });
  }

  // 4. Filter by skills
  // IN PROGRESS


  // --- User profile and role management ---
  // 1. Update profile picture
  async updateProfilePicture(userId: number, key: string) {
    await this.users.update(userId, { profilePicture: key, });
  }

  // 2. Get profile picture
  async getProfilePicture(userId: number): Promise<string | null> {
    const user = await this.users.findOneBy({ uid: userId });
    return user?.profilePicture ?? null;
  }

  // 3. Set or Change role (admin only)
  async changeRole(uid:number, role: userRole) {
    // Find user by uid
    const findUser = await this.findOne(uid);
    if(!findUser) {
      // Throw not found exception if user is not found
      throw new NotFoundException('User not found');
    }
    // Updates the role if user is found and save
    findUser.role = role;
    return await this.users.save(findUser);
  }
}
