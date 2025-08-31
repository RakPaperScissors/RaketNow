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
import { RaketistaSkillService } from '../raketista-skill/raketista-skill.service';
import { Organization } from '../organization/entities/organization.entity';
import { Rating } from '../rating/entities/rating.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly users: Repository<Users>,
    @InjectRepository(Skills)
    private readonly skillsRepo: Repository<Skills>,
    @InjectRepository(RaketistaSkill)
    private readonly raketistaSkillRepo: Repository<RaketistaSkill>,
    @InjectRepository(Raketista)
    private readonly raketistaRepo: Repository<Raketista>,
    @InjectRepository(Organization) 
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>, 
  ){}
  async createUser(CreateUserDto: CreateUserDto){ 
    const user = this.users.create(CreateUserDto);
    return await this.users.save(user)
  }

  async findAll() {
    return await this.users.find();
  }

  async findOne(uid: number) {
    const user = await this.users.findOne({where: {uid}}); 
    if (!user) {
      throw new NotFoundException(`User with ID ${uid} not found.`);
    }
    const { password, providerId, authProvider, deletedAt, ...rest } = user;
    return {
      ...rest,
      profilePicture: user.profilePicture
        ? `${process.env.PICTURE_URL}/raketnow/${user.profilePicture}`
        : `${process.env.PICTURE_URL}/raketnow/user-profile-pictures/default_profile.jpg`,
    };
  }

async patch(uid: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.users.findOne({ where: { uid } });
    if (!user) {
      throw new NotFoundException(`User with ID ${uid} not found.`);
    }

    let targetRepo: Repository<any>;
    switch (user.type) {
      case 'Raketista':
        targetRepo = this.raketistaRepo;
        break;
      case 'Organization':
        targetRepo = this.organizationRepository;
        break;
      default:
        targetRepo = this.users;
    }

    const entityToUpdate = await targetRepo.findOne({ where: { uid } });
    if (!entityToUpdate) {
      throw new NotFoundException(`Specific user type entity for ID ${uid} not found.`);
    }
    Object.assign(entityToUpdate, updateUserDto);
    const updatedEntity = await targetRepo.save(entityToUpdate);
    return {
      statusCode: 200,
      message: 'User updated successfully.',
      data: updatedEntity,
    };
  }

  async remove(uid: number) {
    const findUser = await this.findOne(uid);
    if (!findUser){
      throw new NotFoundException('User not found');
    } else {
      return await this.users.delete(uid);
    }
  }

  async searchByName(name: string): Promise<any[]> {
    const users = await this.users.find({
      where: [
        { firstName: ILike(`%${name}%`) },
        { lastName: ILike(`%${name}%`) }
      ],
      select: ['uid', 'firstName', 'lastName', 'email', 'profilePicture', 'role', 'type'],
    });
    return users.map(user => ({
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture ? user.profilePicture : null,
      role: user.role,
      type: user.type,
    }));
  }

  async searchByEmail(email: string): Promise<any> {
      const user = await this.users.findOne({
        where: { email },
        select: ['uid', 'firstName', 'lastName', 'email', 'profilePicture', 'role', 'type'],
      });
      if (!user) return null;
      return {
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture ? user.profilePicture : null,
        role: user.role,
        type: user.type,           
      };
  }

  async filterByRole(role: userRole) {
    return await this.users.find({ 
      where: { role },
      relations: ['raketistaSkills', 'raketistaSkills.skill']
    });
  }

  async updateProfilePicture(userId: number, newKey: string): Promise<Users> {
    const user = await this.users.findOneBy({ uid: userId });
    if (!user) throw new NotFoundException();

    user.profilePicture = newKey;
    return await this.users.save(user);
  }

  async getProfilePicture(userId: number): Promise<string | null> {
    const user = await this.users.findOneBy({ uid: userId });
    return user?.profilePicture ?? null;
  }

  async changeRole(uid:number, role: userRole) {
    const findUser = await this.findOne(uid);
    if(!findUser) {
      throw new NotFoundException('User not found');
    }
    findUser.role = role;
    return await this.users.save(findUser);
  }

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

  async applyForRaketistaRole(uid: number) {
    const user = await this.users.findOne({ where: { uid } });
    if (!user) {
      throw new NotFoundException(`User with ID ${uid} not found.`);
    }
    if (user.roles && user.roles.includes(userRole.RAKETISTA)) {
      throw new BadRequestException('User is already a raketista.');
    }
    if (user.role !== userRole.CLIENT) {
      throw new BadRequestException('Only users with a primary role of "client" can apply to be a raketista.');
    }
    const updatedRoles = user.roles.includes(userRole.RAKETISTA)
      ? user.roles
      : [...user.roles, userRole.RAKETISTA];

    await this.users
      .createQueryBuilder()
      .update(Users)
      .set({ type: 'Raketista', roles: updatedRoles })
      .where("uid = :uid", { uid: user.uid })
      .execute();

    const updated = await this.users.findOne({ where: { uid: user.uid }});

    return updated;
  }

  async getPublicProfileById(uid: number): Promise<any> {
    const user = await this.raketistaRepo.findOne({
      where: { uid: uid },
      relations: ['raketistaSkills', 'raketistaSkills.skill'],
    });

    if (user) {
      const { averageRating,totalReviews} = await this.getAverageRatingForRaketista(uid); 
      return {
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
        type: user.type,
        createdAt: user.createdAt,
        lastActive: user.lastActive,
        bio: user.bio,
        isRaketistaVerified: user.isRaketistaVerified,
        aveResponseTime: user.aveResponseTime,
        isAutoReplyEnabled: user.isAutoReplyEnabled,
        autoReplyMessage: user.autoReplyMessage,
        averageRating,
        totalReviews,
        raketistaSkills: user.raketistaSkills.map((rs: RaketistaSkill) => ({
          id: rs.id,
          skill: {
            skill_Id: rs.skill.skill_Id,
            skillName: rs.skill.skillName,
            category: rs.skill.category,
          },
        })),
      };
    } else {
      const genericUser = await this.users.findOne({
        where: { uid: uid },
      });
      if (!genericUser) {
        throw new NotFoundException(`User with ID ${uid} not found.`);
      }
      return {
        uid: genericUser.uid,
        firstName: genericUser.firstName,
        lastName: genericUser.lastName,
        email: genericUser.email,
        profilePicture: genericUser.profilePicture,
        role: genericUser.role,
        type: genericUser.type,
        createdAt: genericUser.createdAt,
        lastActive: genericUser.lastActive,
      };
    }
  }

  // get average rating
  async getAverageRatingForRaketista(uid: number): Promise<{ averageRating: number; totalReviews: number }> {
    const ratings = await this.ratingRepo.find({
      where: { raketistaId: uid },
    });

    const totalReviews = ratings.length;
    if (!totalReviews) {
      return { averageRating: 0, totalReviews: 0 };
    }

    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = Number((total / totalReviews).toFixed(2));

    return { averageRating, totalReviews };
  }

  async findAllRaketistasWithRatings() {
    const raketistas = await this.raketistaRepo.find({
      relations: ['raketistaSkills', 'raketistaSkills.skill'],
    });

    return await Promise.all(
      raketistas.map(async (raketista) => {
        const ratings = await this.ratingRepo.find({
          where: { raketistaId: raketista.uid },
        });
        const totalReviews = ratings.length;
        const averageRating = totalReviews
          ? Number((ratings.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(2))
          : 0;
        return {
          ...raketista,
          averageRating,
          totalReviews,
        };
      })
    );
  }
}
