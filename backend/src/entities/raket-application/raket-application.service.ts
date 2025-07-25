import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaketApplication, RaketApplicationStatus } from './entities/raket-application.entity';
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

  async create(dto: CreateRaketApplicationDto, user: Users) {
    const raketista = await this.usersRepository.findOne({ where: { uid: user.uid } });

    if (!raketista || raketista.role !== 'raketista') {
      throw new BadRequestException('Only raketistas can apply to rakets.');
    }

    const raket = await this.raketRepository.findOne({
      where: { raketId: dto.raketId },
      relations: ['user'],
    });

    if (!raket) {
      throw new BadRequestException('Raket not found.');
    }

    const priceProposal =
      dto.priceProposal !== undefined && dto.priceProposal !== null
        ? dto.priceProposal
        : raket.budget;

    if (priceProposal < 0) {
      throw new BadRequestException('Price proposal cannot be negative.');
    }

    // if existing application already
    const existingApplication = await this.raketApplicationRepository.findOne({
      where: {
        raketista: { uid: user.uid },
        raket: { raketId: dto.raketId },
      },
    });

    if (existingApplication) {
      await this.raketApplicationRepository.update(existingApplication.applicationId, {
        priceProposal,
        status: RaketApplicationStatus.PENDING,
      });

      return this.findOne(existingApplication.applicationId);
    }

    const newApplication = this.raketApplicationRepository.create({
      raketista,
      raket,
      priceProposal,
    });

    const savedApplication = await this.raketApplicationRepository.save(newApplication);

    await this.notificationRepository.save({
      user: raket.user,
      message: `A raketista has applied to your raket "${raket.title}".`,
      isRead: false,
      actionable: true,
      raketApplication: savedApplication,
    });

    return savedApplication;
  }

  // find all applications for a specific raket (para pag filter)
  async findByRaket(raketId: number) {
    return this.raketApplicationRepository.find({
      where: { raket: { raketId } },
      relations: ['raketista', 'raket'],
      order: { dateCreated: 'DESC' },
    });
  }

  async findOne(id: number) {
    return this.raketApplicationRepository.findOne({
      where: { applicationId: id },
      relations: ['raketista', 'raket'],
    });
  }

  // fetch all raket applications posted for a single client (like user notifs)
  async getAllForClient(user: Users) {
    return this.raketApplicationRepository.find({
      where: {
        raket: { user: { uid: user.uid } },
      },
      relations: ['raketista', 'raket', 'raket.user'],
      order: { dateCreated: 'DESC' },
    });
  }

  async update(id: number, updateRaketApplicationDto: UpdateRaketApplicationDto) {
    await this.raketApplicationRepository.update(id, updateRaketApplicationDto);
    return this.findOne(id);
  }

  // accept an application (restricted for raket poster)
  async accept(id: number, user: Users) {
    const application = await this.raketApplicationRepository.findOne({
      where: { applicationId: id },
      relations: ['raket', 'raket.user'],
    });

    if (!application || application.raket.user.uid !== user.uid) {
      throw new BadRequestException('You are not authorized to accept this application.');
    }

    await this.raketApplicationRepository.update(id, {
      status: RaketApplicationStatus.ACCEPTED,
    });
  }

  // reject an application (restricted for raket poster)
  async reject(id: number, user: Users) {
    const application = await this.raketApplicationRepository.findOne({
      where: { applicationId: id },
      relations: ['raket', 'raket.user'],
    });

    if (!application || application.raket.user.uid !== user.uid) {
      throw new BadRequestException('You are not authorized to reject this application.');
    }

    await this.raketApplicationRepository.update(id, {
      status: RaketApplicationStatus.REJECTED,
    });
  }

  async remove(id: number) {
    await this.raketApplicationRepository.delete(id);
  }
}
