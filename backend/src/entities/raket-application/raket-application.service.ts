import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { RaketApplication, RaketApplicationStatus } from './entities/raket-application.entity';
import { Users } from './../user/entities/user.entity';
import { Notification } from '../notification/entities/notification.entity';
import { Raket, RaketStatus } from '../rakets/entities/raket.entity';
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
  async findByRaketId(raketId: number) {
    return (
    await this.raketApplicationRepository.find({
      where: { raket: { raketId } },
      relations: ['raketista', 'raket', 'raket.user'],
      order: { dateCreated: 'DESC' },
    })
  ).map(app => ({
    ...app,
    raket: {
      ...app.raket,
      user: app.raket.user
        ? {
            uid: app.raket.user.uid,
            firstName: app.raket.user.firstName,
            lastName: app.raket.user.lastName,
          }
        : null,
    },
  }));
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
      where: {raket: { user: { uid: user.uid } }, },
      relations: ['raketista', 'raket', 'raket.user'],
      order: { dateCreated: 'DESC' },
    });
  }

  // fetch raket applications applied by the raketista
  async getApplicationsByRaketista(user: Users) {
    return this.raketApplicationRepository.find({
      where: { raketista: { uid: user.uid } },
      relations: ['raket', 'raket.user'],
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
      relations: ['raket', 'raket.user', 'raketista'],
    });
    if (!application || application.raket.user.uid !== user.uid) {
      throw new BadRequestException('You are not authorized to accept this application.');
    }
    application.status = RaketApplicationStatus.ACCEPTED; //changes the raket application status to ACCEPTED
    await this.raketApplicationRepository.save(application);
    const raket = application.raket;
    raket.status = RaketStatus.IN_PROGRESS; // changes the raket status to IN PROGRESS
    await this.raketRepository.save(raket);
    //notifies the accepted raketista
    await this.notificationRepository.save({
      user: application.raketista,
      message: `Your application for "${raket.title}" has been accepted!`,
      isRead: false,
      actionable: false,
    });
    // rejects all other application when the client accepts one application
    const rejectedApplications = await this.raketApplicationRepository.find({
      where: {
        raket: { raketId: raket.raketId },
        applicationId: Not(application.applicationId),
      },
      relations: ['raketista'],
    });
    await this.raketApplicationRepository
      .createQueryBuilder()
      .update(RaketApplication)
      .set({ status: RaketApplicationStatus.REJECTED })
      .where('raketId = :raketId AND applicationId != :applicationId', {
        raketId: raket.raketId,
        applicationId: application.applicationId,
      })
      .execute();
    //notifies each rejected raketista
    for (const rejectedApp of rejectedApplications) {
      await this.notificationRepository.save({
        user: rejectedApp.raketista,
        message: `Your application for "${raket.title}" was not accepted.`,
        isRead: false,
        actionable: false,
      });
    }
    return this.findOne(application.applicationId);
  }

  // reject
  async reject(id: number, user: Users) {
    const application = await this.raketApplicationRepository.findOne({
      where: { applicationId: id },
      relations: ['raket', 'raket.user', 'raketista'],
    });
    if (!application || application.raket.user.uid !== user.uid) {
      throw new BadRequestException('You are not authorized to reject this application.');
    }
    await this.raketApplicationRepository.update(id, {
      status: RaketApplicationStatus.REJECTED,
    });
    // notificaitons for rejectin g
    await this.notificationRepository.save({
      user: application.raketista,
      message: `Your application for "${application.raket.title}" has been rejected.`,
      isRead: false,
      actionable: false,
    });
    return this.findOne(id);
  }

  //withdraw from the application
  async withdraw(applicationId: number, user: Users) {
    const application = await this.raketApplicationRepository.findOne({
      where: { applicationId },
      relations: ['raket', 'raket.user', 'raketista'],
    });

    if (!application) {
      throw new BadRequestException('Application not found.');
    }
    if (application.raketista.uid !== user.uid) {
      throw new BadRequestException('You are not authorized to withdraw this application.');
    }
    if (application.status === RaketApplicationStatus.ACCEPTED) {
      throw new BadRequestException('Cannot withdraw an accepted application.');
    }
    application.status = RaketApplicationStatus.WITHDRAWN;
    await this.raketApplicationRepository.save(application);

    await this.notificationRepository.save({
      user: application.raket.user,
      message: `A raketista has withdrawn their application for "${application.raket.title}".`,
      isRead: false,
      actionable: false,
    });

    return { message: 'Application withdrawn successfully.' };
  }


  async remove(id: number) {
    await this.raketApplicationRepository.delete(id);
  }
}
