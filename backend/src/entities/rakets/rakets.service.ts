import { Injectable } from '@nestjs/common';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';

@Injectable()
export class RaketsService {
  create(createRaketDto: CreateRaketDto) {
    return 'This action adds a new raket';
  }

  findAll() {
    return `This action returns all rakets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} raket`;
  }

  update(id: number, updateRaketDto: UpdateRaketDto) {
    return `This action updates a #${id} raket`;
  }

  remove(id: number) {
    return `This action removes a #${id} raket`;
  }
}
