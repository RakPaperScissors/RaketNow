import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Raket, RaketStatus } from './entities/raket.entity';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
import { Users } from '../user/entities/user.entity';
import { RaketApplication, RaketApplicationStatus } from '../raket-application/entities/raket-application.entity';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationService } from '../notification/notification.service';
import { Rating } from '../rating/entities/rating.entity';
@Injectable()
export class RaketsService {
  

constructor(
  @InjectRepository(Raket)
  private readonly raketRepo: Repository<Raket>,
  @InjectRepository(Users)
  private readonly userRepo: Repository<Users>,
  @InjectRepository(RaketApplication)
  private readonly appRepo: Repository<RaketApplication>,
  @InjectRepository(Notification)
  private readonly notifRepo: Repository<Notification>,
  @InjectRepository(Rating) // ADD THIS
  private readonly ratingRepo: Repository<Rating>,
  private readonly notifService: NotificationService
) {}


  async create(createRaketDto: CreateRaketDto, creator: Users): Promise<Raket> {
    const raket = this.raketRepo.create({ ...createRaketDto, user: creator });
    return this.raketRepo.save(raket);
  }

  async findAll() {
    const rakets = await this.raketRepo.find({
      relations: ['user', 'pictures'],
      order: { dateCreated: 'DESC' },
    });
    return rakets.map(r => ({
      raketId: r.raketId,
      title: r.title,
      description: r.description,
      status: r.status,
      budget: r.budget,
      dateCreated: r.dateCreated,
      completedAt: r.completedAt,
      user: {
        uid: r.user.uid,
        email: r.user.email,
        firstName: r.user.firstName,
        lastName: r.user.lastName,
        lastActive: r.user.lastActive,
      },
      pictures: r.pictures.map(p => ({
        id: p.id,
        imageUrl: p.imageUrl,
        displayOrder: p.displayOrder,
      })),
    }));
  }

  async findOne(raketId: number) {
    const raket = await this.raketRepo.findOne({
      where: { raketId },
      relations: ['user', 'pictures'],
    });

    if (!raket) throw new NotFoundException();

    return {
      ...raket,
      user: {
        uid: raket.user.uid,
        email: raket.user.email,
        firstName: raket.user.firstName,
        lastName: raket.user.lastName,
        lastActive: raket.user.lastActive,
      },
      pictures: raket.pictures.map(p => ({
        id: p.id,
        imageUrl: p.imageUrl,
        displayOrder: p.displayOrder,
      })),
    };
  }

  async getEntityById(raketId: number): Promise<Raket> {
    const raket = await this.raketRepo.findOne({
      where: { raketId },
      relations: ['user', 'pictures'],
    });
    if (!raket) throw new NotFoundException();
    return raket;
  }

  async patch(raketId: number, dto: UpdateRaketDto) {
    const raket = await this.getEntityById(raketId);
    if ('user' in dto) {
      throw new BadRequestException('Changing the user of a raket is not allowed.');
    }
    Object.assign(raket, dto);
    return this.raketRepo.save(raket);
  }

  // cancel raket completion confirmation
async clientRejectsCompletionRequest(raketId: number, clientId: number) {
  const raket = await this.raketRepo.findOne({
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
  await this.raketRepo.save(raket);

  const acceptedApp = raket.applications.find(app => app.status === RaketApplicationStatus.ACCEPTED);
  if (acceptedApp) {
    await this.notifRepo.create({
      user: acceptedApp.raketista,
      raket: { raketId: raket.raketId },
      message: `Your completion request for "${raket.title}" was rejected by the client.`,
      actionable: false,
    });
  }

  await this.notifRepo.delete({
    raket: { raketId },
    actionable: true,
  });

  return { message: 'Completion request rejected. Status set back to IN PROGRESS.' };
}


  async cancelOpenRaket(raketId: number, userId: number): Promise<void> {
    const raket = await this.raketRepo.findOne({
      where: { raketId },
      relations: ['user', 'applications', 'applications.raketista'],
    });

    if (!raket) {
      throw new NotFoundException('Raket not found');
    }

    if (raket.user.uid !== userId) {
      throw new ForbiddenException('You are not allowed to cancel this raket');
    }

    if (raket.status !== RaketStatus.OPEN) {
      throw new BadRequestException('Only open rakets can be cancelled this way');
    }

    const applications = await this.appRepo.find({
      where: { raket: { raketId } },
      relations: ['raketista'],
    });

    for (const app of applications) {
      await this.notifService.create({
        user: app.raketista,
        message: `The raket "${raket.title}" you applied to has been cancelled by the client.`,
        raketId: raket.raketId,
      });
    }

    raket.status = RaketStatus.CANCELLED;
    await this.raketRepo.save(raket);
    await this.raketRepo.remove(raket);
  }

  // fetches for GET /raket/my-rakets
async findMyRakets(userId: number) {
  const rakets = await this.raketRepo.find({
    where: { user: { uid: userId } },
    relations: {
      applications: { raketista: true },
    },
    order: { dateCreated: 'DESC' },
  });

  const results: (Raket & {
    myRating: number | null;
    acceptedRaketista: { firstName: string; lastName: string } | null;
  })[] = [];

  for (const raket of rakets) {
    const existingRating = await this.ratingRepo.findOne({
      where: {
        user: { uid: userId },
        raket: { raketId: raket.raketId },
      },
    });

    const acceptedApp = raket.applications.find(
      (app) => app.status === RaketApplicationStatus.ACCEPTED
    );

    results.push({
      ...raket,
      myRating: existingRating ? existingRating.rating : null,
      acceptedRaketista: acceptedApp?.raketista
        ? {
            firstName: acceptedApp.raketista.firstName,
            lastName: acceptedApp.raketista.lastName,
          }
        : null,
    });
  }

  return results;
}





  async updateRaketStatus(raketId: number, status: RaketStatus, userId: number) {
  const raket = await this.getEntityById(raketId);

  if (!Object.values(RaketStatus).includes(status)) {
    throw new BadRequestException(`Invalid status: ${status}`);
  }

  if (raket.user.uid !== userId) {
    throw new ForbiddenException();
  }

  // Allow status change to COMPLETED only if currently pending confirmation or in_progress
  if (
    raket.status === RaketStatus.PENDING_CONFIRMATION &&
    status === RaketStatus.COMPLETED
  ) {
    await this.notifRepo.delete({
      raketId: raketId,
      actionable: true,
    });
  }

  raket.status = status;
  if (status === RaketStatus.COMPLETED) {
    raket.completedAt = new Date();
  }

  await this.raketRepo.save(raket);

  return { message: `Raket status updated to ${status}` };
}


  async getRaketsAssignedToUser(uid: number) {
    const acceptedApps = await this.appRepo.find({
      where: { raketista: { uid }, status: RaketApplicationStatus.ACCEPTED },
      relations: ['raket', 'raket.user'],
    });

    return acceptedApps.map(app => ({
      ...app.raket,
      clientName: `${app.raket.user?.firstName} ${app.raket.user?.lastName}`,
    }));
  }

  // pending confirmation for the raketistas (to be confirmed by the client)
  async raketistaRequestCompletion(raketId: number, raketistaUid: number) {
    const raket = await this.getEntityById(raketId);

    const acceptedApp = await this.appRepo.findOne({
      where: {
        raket: { raketId },
        raketista: { uid: raketistaUid },
        status: RaketApplicationStatus.ACCEPTED,
      },
    });

    if (!acceptedApp) {
      throw new ForbiddenException('Not assigned to this raket');
    }

    raket.status = RaketStatus.PENDING_CONFIRMATION;
    await this.raketRepo.save(raket);

    await this.notifRepo.save({
      user: raket.user,
      message: `Raketista marked "${raket.title}" as completed. Please confirm.`,
      isRead: false,
      actionable: true,
      raket,
    });

    return { message: 'Completion request sent.' };
  }

  async cancelCompletionRequest(raketId: number, raketistaId: number) {
    const raket = await this.raketRepo.findOne({
      where: { raketId },
      relations: ['applications', 'applications.raketista'],
    });
    if (!raket) throw new NotFoundException();

    const isAssigned = raket.applications.some(
      app => app.raketista.uid === raketistaId && app.status === RaketApplicationStatus.ACCEPTED,
    );
    if (!isAssigned) throw new ForbiddenException();

    if (raket.status !== RaketStatus.PENDING_CONFIRMATION) {
      throw new BadRequestException('Not pending confirmation');
    }

    raket.status = RaketStatus.IN_PROGRESS;
    await this.raketRepo.save(raket);
    await this.notifRepo.delete({ raket: { raketId } });

    return { message: 'Completion request cancelled.' };
  }

  async withdrawRaket(raketId: number, raketistaUid: number) {
    const raket = await this.raketRepo.findOne({
      where: { raketId },
      relations: ['applications', 'applications.raketista', 'user'],
    });
    if (!raket) throw new NotFoundException();

    const acceptedApp = raket.applications.find(
      app => app.raketista.uid === raketistaUid && app.status === RaketApplicationStatus.ACCEPTED,
    );
    if (!acceptedApp) throw new ForbiddenException('You are not assigned to this raket');

    acceptedApp.status = RaketApplicationStatus.WITHDRAWN;
    raket.status = RaketStatus.OPEN;

    await this.appRepo.save(acceptedApp);
    await this.raketRepo.save(raket);

    await this.notifService.create({
      user: raket.user,
      message: `Raketista withdrew from "${raket.title}". It's now open.`,
      raketId: raket.raketId,
      actionable: false,
    });

    const rejectedApps = raket.applications.filter(app => app.status === RaketApplicationStatus.REJECTED);
    for (const app of rejectedApps) {
      app.status = RaketApplicationStatus.PENDING;
      await this.appRepo.save(app);
      if (app.raketista) {
        await this.notifService.create({
          user: app.raketista,
          message: `"${raket.title}" is open again. Your application is reopened.`,
          raketId: raket.raketId,
          actionable: false,
        });
      }
    }

    return { message: 'Successfully withdrawn from raket.' };
  }

  async cancelOngoingRaket(raketId: number, userId: number): Promise<Raket> {
    const raket = await this.getEntityById(raketId);

    if (raket.user.uid !== userId) {
      throw new ForbiddenException("You are not allowed to cancel this raket.");
    }

    if (raket.status !== RaketStatus.IN_PROGRESS) {
      throw new BadRequestException("Only in-progress rakets can be cancelled.");
    }

    // Find accepted raket application
    const acceptedApplication = await this.appRepo.findOne({
      where: {
        raket: { raketId: raketId },
        status: RaketApplicationStatus.ACCEPTED,
      },
      relations: ['raketista'], 
    });
    raket.status = RaketStatus.CANCELLED;
    raket.completedAt = new Date();

    await this.raketRepo.save(raket);

    if (acceptedApplication) {
      await this.notifRepo.create({
        user: acceptedApplication.raketista,
        message: `The raket "${raket.title}" was cancelled by the poster.`
      });
    }

    return raket;
  }

  async deleteRaket(raketId: number, userId: number): Promise<void> {
    const raket = await this.getEntityById(raketId);

    if (raket.user.uid !== userId) {
      throw new ForbiddenException('You are not allowed to delete this raket.');
    }

    if (raket.status !== RaketStatus.CANCELLED) {
      throw new BadRequestException('Only cancelled rakets can be deleted.');
    }

    await this.raketRepo.delete(raketId);
  }


}
