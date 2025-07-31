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
async patch(uid: number, updateUserDto: UpdateUserDto): Promise<any> {
    // Determine the correct repository based on the user's role or type
    // First, find the user to know their exact type/role
    const user = await this.users.findOne({ where: { uid } });
    if (!user) {
      throw new NotFoundException(`User with ID ${uid} not found.`);
    }

    let targetRepo: Repository<any>;
    // IMPORTANT: Your user.entity has a 'type' column for @TableInheritance.
    // Use this 'type' column, not 'role', to select the correct child repository.
    // Ensure 'type' is mapped correctly in your Users entity.
    switch (user.type) {
      case 'Raketista': // This should match the @ChildEntity name for Raketista
        targetRepo = this.raketistaRepo;
        break;
      case 'Organization': // This should match the @ChildEntity name for Organization
        targetRepo = this.organizationRepository;
        break;
      default:
        targetRepo = this.users; // Default to base User repo for Client/Admin
    }

    // Now, fetch the specific entity instance using the correct repository
    // (We use `findOneBy` if you have `uid` mapped as PK in child entities too)
    // Or if `uid` is only in base, then use `findOne` on the base entity and apply updates.
    const entityToUpdate = await targetRepo.findOne({ where: { uid } }); // Using findOne because `uid` is PK for all children

    if (!entityToUpdate) { // Should not happen if `user` was found above
      throw new NotFoundException(`Specific user type entity for ID ${uid} not found.`);
    }

    // Apply updates using Object.assign or direct property assignment
    Object.assign(entityToUpdate, updateUserDto);

    // Save using the correct repository
    const updatedEntity = await targetRepo.save(entityToUpdate);

    // Return a clean response
    return {
      statusCode: 200,
      message: 'User updated successfully.',
      data: updatedEntity, // Return the updated entity
    };
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
  async updateProfilePicture(userId: number, newKey: string): Promise<Users> {
    const user = await this.users.findOneBy({ uid: userId });
    if (!user) throw new NotFoundException();

    user.profilePicture = newKey;
    return await this.users.save(user);
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
  async applyForRaketistaRole(uid: number) {
    // Find the user (as base class)
    const user = await this.users.findOne({ where: { uid } });
    if (!user) {
      throw new NotFoundException(`User with ID ${uid} not found.`);
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

  // For getting profile details
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
