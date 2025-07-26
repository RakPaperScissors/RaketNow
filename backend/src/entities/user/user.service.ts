import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userRole } from './entities/user.entity';
import { Raketista } from './../raketista/entities/raketista.entity';
import { Skills } from '../skills/entities/skill.entity';
import { RaketistaSkill } from '../raketista-skill/entities/raketista-skill.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly users: Repository<Users>,
    @InjectRepository(Skills)
    private readonly skillsRepo: Repository<Skills>,
    @InjectRepository(RaketistaSkill)
    private readonly raketistaSkillRepo: Repository<RaketistaSkill>,
  ){}

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

  // 3. Add additional role
  async addRole(uid: number, newRole: userRole) {
    const user = await this.users.findOne({ where: { uid: uid} });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.roles.includes(newRole)) {
      user.roles.push(newRole);
      await this.users.save(user);
    }
    return user;
  }

  // 4. Apply to be a raketista from client
  async applyForRaketistaRole(userId: number, bio: string, skillId: number): Promise<Users | null> {
    const user = await this.users.findOne({ 
      where: { uid: userId },
      relations: ['raketistaSkills', 'raketistaSkills.skill'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    // Check if user already has raketista in 'roles'
    if (user.roles && user.roles.includes(userRole.RAKETISTA)) {
      throw new BadRequestException('User is already a raketista.');
    }
    // Ensure clients can only apply
    if (user.role !== userRole.CLIENT) {
      throw new BadRequestException('Only users with a primary role of "client" can apply to be a raketista.');
    }
    // Add raketista to roles
    user.roles = user.roles ? [...user.roles, userRole.RAKETISTA] : [userRole.RAKETISTA];

    // Set bio
    const raketista = user as unknown as Raketista;
    raketista.bio = bio;

    await this.users.save(raketista);

    // Assign skill
    const skill = await this.skillsRepo.findOne({ where: { skill_Id: skillId } });
    if (!skill) {
      throw new NotFoundException('Skill not found.');
    }
    const existing = await this.raketistaSkillRepo.findOne({
      where: {
        raketista: { uid: userId },
        skill: { skill_Id: skillId },
      },
    });

    if (!existing) {
      const newRelation = this.raketistaSkillRepo.create({ raketista, skill });
      await this.raketistaSkillRepo.save(newRelation);
    }

    return this.users.findOne({
      where: { uid: userId },
      relations: ['raketistaSkills', 'raketistaSkills.skill'],
    });
    
  }
}
