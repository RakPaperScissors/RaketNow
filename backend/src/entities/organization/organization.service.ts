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

  // Basic CRUD Functions for Orgs
  async createOrg(createOrganizationDto: CreateOrganizationDto) {
    const organization = this.organizations.create({
      ...createOrganizationDto, 
      role: userRole.ORGANIZATION,
    });

    return await this.organizations.save(organization);
  }

  async findAll() {
    return await this.organizations.find();
  }

  async findOne(uid: number) {
    return await this.organizations.findOne({where: { uid, role: userRole.ORGANIZATION } });
  }

  async patch(uid: number, updateOrganizationDto: UpdateOrganizationDto) {
    const findOrg = await this.findOne(uid);

    if(!findOrg) {
      throw new Error(`Organization with uid ${uid} not found`);
    }
    
    Object.assign(findOrg, updateOrganizationDto);
    return await this.organizations.save(findOrg);
  }

  async remove(uid: number) {
    const findOrg = await this.findOne(uid);

    if(!findOrg) {
      throw new NotFoundException();
    }
    else {
      return await this.organizations.delete(uid);
    } 
  }

  async searchByOrgName(orgName: string) {
    return await this.organizations.find({ where: { orgName: ILike(`%${orgName}%`)} });
  }
}
