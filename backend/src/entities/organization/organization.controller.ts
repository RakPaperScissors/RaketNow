import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  // --- Basic CRUD Functions ---
  // POSTs new organization
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.createOrg(createOrganizationDto);
  }

  // GETs all organizations
  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  // GETs one organization by uid
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(+id);
  }

  // PATCHEs organization by uid
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.patch(+id, updateOrganizationDto);
  }

  // DELETEs organization by uid
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }


  // --- Search and Filter functions ---
  // Searches organizations by OrgName
  @Get('search/orgName/:orgName')
  searchByOrgName(@Param('orgName') orgName: string) {
    return this.organizationService.searchByOrgName(orgName);
  }
}
