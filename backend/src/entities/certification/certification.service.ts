import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certification } from './entities/certification.entity';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Injectable()
export class CertificationService {
  constructor(
    @InjectRepository(Certification)
    private readonly certRepo: Repository<Certification>,
  ) {}

  async create(dto: CreateCertificationDto, raketistaId: number) {
    const cert = this.certRepo.create({
      ...dto,
      raketistaId: { uid: raketistaId },
    });
    return this.certRepo.save(cert);
  }


  findAll() {
    return this.certRepo.find();
  }

  findOne(id: number) {
    return this.certRepo.findOneBy({ certId: id });
  }

  async update(id: number, updateDto: UpdateCertificationDto) {
    await this.certRepo.update(id, updateDto);
    return this.certRepo.findOneBy({ certId: id });
  }

  async remove(id: number) {
    await this.certRepo.delete(id);
    return { message: `Certification #${id} deleted` };
  }

  async updateField(id: number, fields: Partial<Certification>) {
    await this.certRepo.update(id, fields);
    return this.certRepo.findOneBy({ certId: id });
  }
}
