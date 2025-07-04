import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  // --- Basic CRUD Functions ---
  // POSTs new organization
  @Roles('admin')
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.createOrg(createOrganizationDto);
  }

  // GETs all organizations
  @Roles('admin', 'client', 'raketista', 'organization')
  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  // GETs one organization by uid
  @Roles('admin', 'client', 'raketista', 'organization')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(+id);
  }

  // PATCHEs organization by uid
  @Roles('admin', 'organization')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.patch(+id, updateOrganizationDto);
  }

  // DELETEs organization by uid
  @Roles('admin', 'organization')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }

  // --------------------------------------------------------------------------------------------------------

  // --- Search and Filter functions ---
  // Searches organizations by OrgName
  @Roles('admin', 'client', 'raketista', 'organization')
  @Get('search/orgName/:orgName')
  searchByOrgName(@Param('orgName') orgName: string) {
    return this.organizationService.searchByOrgName(orgName);
  }
}
