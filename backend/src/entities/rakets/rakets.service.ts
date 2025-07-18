import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRaketDto } from "./dto/create-raket.dto";
import { UpdateRaketDto } from "./dto/update-raket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Raket } from "./entities/raket.entity";
import { Repository } from "typeorm";
import { Users } from "../user/entities/user.entity";

@Injectable()
export class RaketsService {
  constructor(
    @InjectRepository(Raket)
    private readonly raket: Repository<Raket>
  ) {}

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

  async remove(raketId: number) {
    const raket = await this.getEntityById(raketId);
    return await this.raket.remove(raket);
  }

}
