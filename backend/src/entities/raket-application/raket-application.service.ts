import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaketApplication } from './entities/raket-application.entity';
import { Users } from './../user/entities/user.entity';
import { Notification } from '../notification/entities/notification.entity';
import { Raket } from '../rakets/entities/raket.entity';
import { CreateRaketApplicationDto } from './dto/create-raket-application.dto';
import { UpdateRaketApplicationDto } from './dto/update-raket-application.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class RaketApplicationService {
  constructor(
    @InjectRepository(RaketApplication)
    private readonly raketApplicationRepository: Repository<RaketApplication>,

    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    @InjectRepository(Raket)
    private readonly raketRepository: Repository<Raket>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(dto: CreateRaketApplicationDto, user: any) {
    const foundUser = await this.usersRepository.findOne({
      where: { uid: user.uid },
    });

    if (!foundUser || foundUser.role !== 'raketista') {
      throw new BadRequestException('Only raketistas can apply to rakets.');
    }

    const existingApplication = await this.raketApplicationRepository.findOne({
      where: {
        raketista: { uid: user.uid },
        raket: { raketId: dto.raketId },
      },
    });

    if (existingApplication) {
      await this.raketApplicationRepository.update(existingApplication.applicationId, {
        priceProposal: dto.priceProposal,
      });
      return this.findOne(existingApplication.applicationId);
    }


    const application = this.raketApplicationRepository.create({
      raketista: { uid: user.uid },
      raket: { raketId: dto.raketId },
      priceProposal: dto.priceProposal,
    });

    const raket = await this.raketRepository.findOne({
      where: { raketId: dto.raketId },
      relations: ['user'],
    });

    const savedApplication = await this.raketApplicationRepository.save(application);

    if (raket) {
      await this.notificationRepository.save({
        user: { uid: raket.user.uid },
        message: `A raketista has applied to your raket "${raket.title}".`,
        isRead: false,
        actionable: true,
        raketApplication: { applicationId: savedApplication.applicationId },
      });
    }

    return savedApplication;
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

  // for accepting or rejecting application
  async accept(id: number) {
    await this.raketApplicationRepository.update(id, { status: 'accepted' });
  }

  async reject(id: number) {
    await this.raketApplicationRepository.update(id, { status: 'rejected' });
  }

  remove(id: number) {
    return this.raketApplicationRepository.delete(id);
  }
}
