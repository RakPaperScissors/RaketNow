import { Injectable } from '@nestjs/common';
import { CreateRaketistaDto } from './dto/create-raketista.dto';
import { UpdateRaketistaDto } from './dto/update-raketista.dto';

@Injectable()
export class RaketistaService {
  create(createRaketistaDto: CreateRaketistaDto) {
    return 'This action adds a new raketista';
  }

  findAll() {
    return `This action returns all raketista`;
  }

  findOne(id: number) {
    return `This action returns a #${id} raketista`;
  }

  update(id: number, updateRaketistaDto: UpdateRaketistaDto) {
    return `This action updates a #${id} raketista`;
  }

  remove(id: number) {
    return `This action removes a #${id} raketista`;
  }
}
