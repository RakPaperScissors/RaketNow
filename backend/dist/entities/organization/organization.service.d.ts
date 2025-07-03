import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
export declare class OrganizationService {
    private readonly organizations;
    constructor(organizations: Repository<Organization>);
    createOrg(createOrganizationDto: CreateOrganizationDto): Promise<Organization>;
    findAll(): Promise<Organization[]>;
    findOne(uid: number): Promise<Organization | null>;
    patch(uid: number, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization>;
    remove(uid: number): Promise<import("typeorm").DeleteResult>;
    searchByOrgName(orgName: string): Promise<Organization[]>;
}
