import { BadRequestException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Raket, RaketStatus } from './entities/raket.entity';
import { Repository } from 'typeorm';
import { Users } from '../user/entities/user.entity';
import { RaketApplication, RaketApplicationStatus } from "../raket-application/entities/raket-application.entity";
import { Notification } from '../notification/entities/notification.entity';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class RaketsService {
  constructor(
    @InjectRepository(Raket)
    private readonly raket: Repository<Raket>,
    @InjectRepository(Users)
    private readonly users: Repository<Users>,
    @InjectRepository(RaketApplication)
    private readonly raketApplicationRepository: Repository<RaketApplication>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  private readonly notificationService: NotificationService ) {
  }

  async create(createRaketDto: CreateRaketDto, creator: Users): Promise<Raket> {
    const raket = this.raket.create({
      ...createRaketDto,
      user: creator,
    });
    return this.raket.save(raket);
  }

  async findAll() {
    const rakets = await this.raket.find({
      relations: ["user", "pictures"],
      order: { dateCreated: "DESC" },
    });
    return rakets.map((raket) => ({
      raketId: raket.raketId,
      title: raket.title,
      description: raket.description,
      status: raket.status,
      budget: raket.budget,
      dateCreated: raket.dateCreated,
      completedAt: raket.completedAt,
      user: {
        uid: raket.user.uid,
        email: raket.user.email,
        firstName: raket.user.firstName,
        lastName: raket.user.lastName,
        lastActive: raket.user.lastActive,
      },
      pictures: raket.pictures.map((picture) => ({
        id: picture.id,
        imageUrl: picture.imageUrl,
        displayOrder: picture.displayOrder,
      })),
    }));
  }

  async findOne(raketId: number) {
    const raket = await this.raket
      .createQueryBuilder("raket")
      .leftJoinAndSelect("raket.user", "user")
      .leftJoinAndSelect("raket.pictures", "pictures")
      .select([
        'raket.raketId',
        'raket.title',
        'raket.description',
        'raket.status',
        'raket.budget',
        'raket.dateCreated',
        'raket.completedAt',
        'user.uid',
        'user.email',
        'user.firstName',
        'user.lastName',
        'user.lastActive',
        'pictures.id',
        'pictures.imageUrl',
        'pictures.displayOrder',
      ])
      .where("raket.raketId = :raketId", { raketId })
      .getOne();

    if (!raket) {
      throw new NotFoundException();
    }

    return {
      raketId: raket.raketId,
      title: raket.title,
      description: raket.description,
      status: raket.status,
      budget: raket.budget,
      dateCreated: raket.dateCreated,
      completedAt: raket.completedAt,
      user: {
        uid: raket.user.uid,
        email: raket.user.email,
        firstName: raket.user.firstName,
        lastName: raket.user.lastName,
        lastActive: raket.user.lastActive,
      },
      pictures: raket.pictures.map((picture) => ({
        id: picture.id,
        imageUrl: picture.imageUrl,
        displayOrder: picture.displayOrder,
      })),
    };
  }

  async getEntityById(raketId: number): Promise<Raket> {
    const raket = await this.raket.findOne({
      where: { raketId },
      relations: ['user', 'pictures']
    });
    if (!raket) {
      throw new NotFoundException();
    }
    return raket;
  }

  async patch(raketId: number, updateRaketDto: UpdateRaketDto) {
    const raket = await this.getEntityById(raketId);

    if ('user' in updateRaketDto) {
      throw new BadRequestException('Changing the user of a raket is not allowed.');
    }

    Object.assign(raket, updateRaketDto);
    return await this.raket.save(raket);
  }

  async remove(raketId: number, userId: number) {
    const raket = await this.raket.findOne({
      where: { raketId },
      relations: ['user'],
    });

    if (!raket) {
      throw new NotFoundException('Raket not found');
    }

    if (raket.user.uid !== userId) {
      throw new ForbiddenException('You are not allowed to delete this raket.');
    }

    const applications = await this.raketApplicationRepository.find({
      where: { raket: { raketId: raketId } },
      relations: ['raketista'],
    });
    for (const app of applications) {
      await this.notificationService.create({
        user: app.raketista,
        message: `The raket "${raket.title}" you applied to has been deleted by the client.`,
        raketId: raket.raketId,
      });
    }

    await this.raketApplicationRepository.delete({ raket: { raketId } });
    return await this.raket.remove(raket);
  }

  async cancelRaket(raketId: number, userId: number) {
    const raket = await this.raket.findOne({
      where: { raketId },
      relations: ['user'],
    });

    if (!raket) throw new NotFoundException('Raket not found');
    if (raket.user.uid !== userId) throw new ForbiddenException('You are not allowed to cancel this raket.');

    const acceptedApp = await this.raketApplicationRepository.findOne({
      where: {
        raket: { raketId },
        status: RaketApplicationStatus.ACCEPTED, 
      },
      relations: ['raketista'],
    });

    if (raket.status !== 'in_progress') {
      throw new BadRequestException('Only ongoing rakets can be cancelled.');
    }

    raket.status = RaketStatus.CANCELLED;
    await this.raket.save(raket);

    if (acceptedApp) {
      await this.notificationService.create({
        user: acceptedApp.raketista,
        message: `The raket "${raket.title}" has been cancelled by the poster.`,
        raketId: raket.raketId,
        raket: raket,
        raketApplication: acceptedApp,
        actionable: false,
      });
    }

    return raket;
  }
  // cancel raket completion confirmation
  async clientRejectsCompletionRequest(raketId: number, clientId: number) {
    const raket = await this.raket.findOne({
      where: { raketId },
      relations: ['user', 'applications', 'applications.raketista'],
    });

    if (!raket) throw new NotFoundException('Raket not found');

    if (raket.user.uid !== clientId) {
      throw new ForbiddenException('You are not authorized to perform this action');
    }

    if (raket.status !== RaketStatus.PENDING_CONFIRMATION) {
      throw new BadRequestException('Raket is not pending confirmation');
    }

    raket.status = RaketStatus.IN_PROGRESS;
    await this.raket.save(raket);

    const acceptedApp = raket.applications.find(app => app.status === RaketApplicationStatus.ACCEPTED);

    if (acceptedApp) {
      await this.notificationService.create({
        user: acceptedApp.raketista,
        raket: { raketId: raket.raketId },
        message: `Your completion request for "${raket.title}" was rejected by the client.`,
        actionable: false,
      });
    }

    await this.notificationRepository.delete({
      raket: { raketId },
      actionable: true,
    });

    return { message: 'Completion request rejected. Status set back to IN PROGRESS.' };
  }

  // fetches for get /raket/myrakets
  async findMyRakets(userId: number) {
    const rakets = await this.raket.find({
      where: { user: { uid: userId } },
      relations: {
        applications: {
          raketista: true,
        },
      },
      order: {
        dateCreated: 'DESC',
      },
    });
    return rakets.map(raket => {
      const acceptedApp = raket.applications.find(app => app.status === 'ACCEPTED');
      return {
        ...raket,
        acceptedRaketista: acceptedApp?.raketista
          ? {
              firstName: acceptedApp.raketista.firstName,
              lastName: acceptedApp.raketista.lastName,
            }
          : null,
      };
    });
  }

  async updateRaketStatus(raketId: number, status: RaketStatus) {
    const raket = await this.getEntityById(raketId);
    if (!Object.values(RaketStatus).includes(status)) {
      throw new BadRequestException(`Invalid raket status: ${status}`);
    }
    const previousStatus = raket.status;
    if (
      previousStatus === RaketStatus.PENDING_CONFIRMATION &&
      status === RaketStatus.COMPLETED
    ) {
      await this.notificationRepository.delete({
        raketId: raketId,
        actionable: true,
      });
    }
    raket.status = status;
    if (status === RaketStatus.COMPLETED) {
      raket.completedAt = new Date();
    }
    return await this.raket.save(raket);
  }

  // fetch all rakets assigned to raketista
  async getRaketsAssignedToUser(uid: number) {
    const acceptedApplications = await this.raketApplicationRepository.find({
      where: {
        raketista: { uid },
        status: RaketApplicationStatus.ACCEPTED,
      },
      relations: ['raket', 'raket.user'],
    });

    const assignedRakets = acceptedApplications.map(app => {
      const raket = app.raket;
      return {
        raketId: raket.raketId,
        title: raket.title,
        status: raket.status,
        completedAt: raket.completedAt,
        dateCreated: raket.dateCreated,
        clientUid: raket.user?.uid,
        clientName: raket.user ? `${raket.user.firstName} ${raket.user.lastName}` : 'Unknown',
      };
    });

    return assignedRakets;
  }

  // withdrawal from ongoing raket
  async withdrawRaket(raketId: number, raketistaUid: number) {
    const raket = await this.raket.findOne({
      where: { raketId },
      relations: ['applications', 'user', 'applications.raketista'],
    });
    if (!raket) {
      throw new NotFoundException('Raket not found');
    }
    const acceptedApp = raket.applications.find(app =>
      app.raketista?.uid === raketistaUid && app.status === RaketApplicationStatus.ACCEPTED,
    );

    if (!acceptedApp) {
      throw new ForbiddenException('You are not the assigned raketista');
    }
    acceptedApp.status = RaketApplicationStatus.WITHDRAWN;
    raket.status = RaketStatus.OPEN;

    await this.raketApplicationRepository.save(acceptedApp);
    await this.raket.save(raket);

    await this.notificationService.create({
      user: raket.user,
      message: `The raketista has withdrawn from your raket "${raket.title}". It is now open again.`,
      raketId: raket.raketId,
      actionable: false,
    });

    return { message: 'Successfully withdrawn from raket' };
  }

  // pending confirmation for the raketistas (to be confirmed by the client)
  async raketistaRequestCompletion(raketId: number, raketistaUid: number) {
    const raket = await this.raket.findOne({
      where: { raketId },
      relations: ['user'],
    });
    if (!raket) throw new NotFoundException('Raket not found');
    // cehcks if the raketista is assigned to this raket
    const acceptedApplication = await this.raketApplicationRepository.findOne({
      where: {
        raket: { raketId },
        raketista: { uid: raketistaUid },
        status: RaketApplicationStatus.ACCEPTED,
      },
    });
    if (!acceptedApplication) {
      throw new ForbiddenException('You are not assigned to this raket');
    }

    raket.status = RaketStatus.PENDING_CONFIRMATION;
    await this.raket.save(raket);

    await this.notificationRepository.save({
      user: raket.user,
      message: `Your raket "${raket.title}" was marked as completed by the raketista. Please confirm.`,
      isRead: false,
      actionable: true,
      raket: raket,
    });
    return { message: 'Completion request sent to client' };
  }

  async cancelCompletionRequest(raketId: number, raketistaId: number) {
    const raket = await this.raket.findOne({
      where: { raketId },
      relations: ['applications', 'applications.raketista'],
    });

    if (!raket) throw new NotFoundException('Raket not found');

    const isAssigned = raket.applications.some(app =>
      app.raketista.uid === raketistaId && app.status === RaketApplicationStatus.ACCEPTED,
    );

    if (!isAssigned) {
      throw new ForbiddenException('You are not assigned to this raket');
    }

    if (raket.status !== RaketStatus.PENDING_CONFIRMATION) {
      throw new BadRequestException('Raket is not pending confirmation');
    }

    raket.status = RaketStatus.IN_PROGRESS;
    await this.raket.save(raket);

    await this.notificationRepository.delete({
      raket: { raketId },
    });

    return { message: 'Completion request cancelled. Back to IN PROGRESS.' };
  }

}
