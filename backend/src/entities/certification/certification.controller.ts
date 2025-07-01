import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { AuthGuard } from '@nestjs/passport';
// import { userRole } from '../user/entities/user.entity'; // (for roles)

@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  // add certification (for Raketista only)
  @Post()
  // @UseGuards(AuthGuard('jwt'))
  create(@Req() req, @Body() dto: CreateCertificationDto) {
    const raketistaId = req.user.uid; // from decoded JWT
    return this.certificationService.create(dto, raketistaId);
  }

  // show all certification (for all users)
  @Get()
  findAll() {
    return this.certificationService.findAll();
  }

  // get specific certifcation for viewing (for all users)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificationService.findOne(+id);
  }

  // full update of the certification infromation (for Raketista only)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificationDto: UpdateCertificationDto) {
    return this.certificationService.update(+id, updateCertificationDto);
  }

  // update the certification title only (for Raketista only)
  @Patch(':id/title')
  updateTitle(@Param('id') id: string, @Body('title') title: string) {
    return this.certificationService.updateField(+id, { title });
  }

  // update the certification fileURL only (for Raketista only)
  @Patch(':id/fileURL')
  updateFile(@Param('id') id: string, @Body('fileURL') fileURL: string) {
    return this.certificationService.updateField(+id, { fileURL });
  }

  // update the certification issuingOrganization only (for Raketista only)
  @Patch(':id/issuingOrganization')
  updateOrg(@Param('id') id: string, @Body('issuingOrganization') org: string) {
    return this.certificationService.updateField(+id, { issuingOrganization: org });
  }

  // delete one certification (for Raketista only)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificationService.remove(+id);
  }
}
