import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { userRole } from '../user/entities/user.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizations: Repository<Organization>) {}

  // --- Basic CRUD Functions for Orgs ---
  // 1. Create New Organization
  async createOrg(createOrganizationDto: CreateOrganizationDto) {
    // Creates new organization user based on inputted details
    const organization = this.organizations.create( { ...createOrganizationDto,  role: userRole.ORGANIZATION } );
    // Returns and saves the organization
    return await this.organizations.save(organization);
  }

  // 2. Find all organizations
  async findAll() {
    return await this.organizations.find();
  }

  // 3. Finds one organization by uid
  async findOne(uid: number) {
    return await this.organizations.findOne({where: { uid, role: userRole.ORGANIZATION } });
  }

  // 4. Edit organization by uid
  async patch(uid: number, updateOrganizationDto: UpdateOrganizationDto) {
    // Checks if the organization exists
    const findOrg = await this.findOne(uid);
    if(!findOrg) {
      // Throw new error if organization is not found
      throw new Error(`Organization with uid ${uid} not found`);
    }
    // Assigns the new data to the organization and updates it
    Object.assign(findOrg, updateOrganizationDto);
    return await this.organizations.save(findOrg);
  }

  // 5. Delete organization by uid
  async remove(uid: number) {
    // Finds organization by uid
    const findOrg = await this.findOne(uid);
    if(!findOrg) {
      // Throw new not found exception if organization is not found
      throw new NotFoundException('Organization not found');
    } else {
      // Deletes the organization from database
      return await this.organizations.delete(uid);
    } 
  }

  // --- Search and Filter Functions ---
  // 1. Search Organization by Name
  async searchByOrgName(orgName: string) {
    // Finds organization by organization name using ILike for incomplete inputs (part of the orgname only)
    return await this.organizations.find({ where: { orgName: ILike(`%${orgName}%`)} });
  }
}
