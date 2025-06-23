import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    create(createOrganizationDto: CreateOrganizationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): string;
    remove(id: string): string;
}
