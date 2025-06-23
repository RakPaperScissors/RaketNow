import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationService {
    create(createOrganizationDto: CreateOrganizationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrganizationDto: UpdateOrganizationDto): string;
    remove(id: number): string;
}
