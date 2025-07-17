import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaketApplication } from './entities/raket-application.entity';
import { Users } from './../user/entities/user.entity';
import { CreateRaketApplicationDto } from './dto/create-raket-application.dto';
import { UpdateRaketApplicationDto } from './dto/update-raket-application.dto';

@Injectable()
export class RaketApplicationService {
  constructor(
    @InjectRepository(RaketApplication)
    private readonly raketApplicationRepository: Repository<RaketApplication>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createRaketApplicationDto: CreateRaketApplicationDto) {
    const user = await this.usersRepository.findOne({
      where: { uid: createRaketApplicationDto.raketistaId },
    });

    // error handling: check if the applicant is a raketista
    if (!user || user.role !== 'raketista') {
      throw new Error('Only raketistas can apply to rakets.');
    }

    const application = this.raketApplicationRepository.create({
      raketista: { uid: createRaketApplicationDto.raketistaId },
      raket: { raketId: createRaketApplicationDto.raketId },
      priceProposal: createRaketApplicationDto.priceProposal,
      budget: createRaketApplicationDto.budget,
    });
    return this.raketApplicationRepository.save(application);
  }

  findAll() {
    return this.raketApplicationRepository.find();
  }

  findOne(id: number) {
    return this.raketApplicationRepository.findOne({ where: { applicationId: id } });
  }

  async update(id: number, updateRaketApplicationDto: UpdateRaketApplicationDto) {
    await this.raketApplicationRepository.update(id, updateRaketApplicationDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.raketApplicationRepository.delete(id);
  }
}
