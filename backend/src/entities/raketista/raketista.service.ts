import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaketistaDto } from './dto/create-raketista.dto';
import { UpdateRaketistaDto } from './dto/update-raketista.dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Raketista } from './entities/raketista.entity';
import { userRole } from '../user/entities/user.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class RaketistaService {
  constructor(
    @InjectRepository(Raketista)
    private readonly raketistas: Repository<Raketista>) {}


  async create(createRaketistaDto: CreateRaketistaDto) {
    const raketista = this.raketistas.create({
      ...createRaketistaDto,
      role: userRole.RAKETISTA,
    });

    return await this.raketistas.save(raketista);
  }

  async findAll() {
    return await this.raketistas.find();
  }

  async findOne(uid: number) {
    return await this.raketistas.findOne({where: { uid, role: userRole.RAKETISTA}});
  }

  async update(uid: number, updateRaketistaDto: UpdateRaketistaDto) {
    const findRaketista = await this.findOne(uid);

    if(!findRaketista) {
      throw new Error(`Raketista with uid ${uid} not found`);
    }

    Object.assign(findRaketista, updateRaketistaDto);
    return await this.raketistas.save(findRaketista);
  }

  async remove(uid: number) {
    const findRaketista = await this.findOne(uid);

    if(!findRaketista) {
      throw new NotFoundException();
    }
    else {
      return await this.raketistas.delete(uid);
    }
  }

  async searchByRaketistaName(name: string) {
    return await this.raketistas.find({ where: { role: userRole.RAKETISTA, name: ILike(`%${name}%`) } });
  }
  
}
