import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaketDto } from './dto/create-raket.dto';
import { UpdateRaketDto } from './dto/update-raket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Raket } from './entities/raket.entity';
import { Repository } from 'typeorm';
import { Users } from '../user/entities/user.entity';

@Injectable()
export class RaketsService {
  constructor (
    @InjectRepository(Raket)
    private readonly raket: Repository<Raket>,
    @InjectRepository(Users)
    private readonly users: Repository<Users>) {
  }

  async create(createRaketDto: CreateRaketDto) {
    const user = await this.users.findOne({ where: { uid: createRaketDto.user } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const raket = this.raket.create({ ...createRaketDto, user: { uid: createRaketDto.user } as Users });
    return await this.raket.save(raket);
  }

  async findAll() {
    const rakets = await this.raket.find({
      relations: ['user', 'pictures'],
      order: { dateCreated: 'DESC' }
    });
    return rakets.map(raket => ({
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
        name: raket.user.name,
        lastActive: raket.user.lastActive
      },
      pictures: raket.pictures.map(picture => ({
        id: picture.id,
        imageUrl: picture.imageUrl,
        displayOrder: picture.displayOrder
      }))
    }));
  }

  async findOne(raketId: number) {
    const raket = await this.raket.createQueryBuilder('raket')
      .leftJoinAndSelect('raket.user', 'user')
      .leftJoinAndSelect('raket.pictures', 'pictures')
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
        'user.name',
        'user.lastActive',
        'pictures.id',
        'pictures.imageUrl',
        'pictures.displayOrder',
      ])
      .where('raket.raketId = :raketId', { raketId })
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
        name: raket.user.name,
        lastActive: raket.user.lastActive,
      },
      pictures: raket.pictures.map(picture => ({
        id: picture.id,
        imageUrl: picture.imageUrl,
        displayOrder: picture.displayOrder,
      })),
    };
  }

  async patch(racketId: number, updateRaketDto: UpdateRaketDto) {
    const findRaket = await this.findOne(racketId);

    if (!findRaket) {
      throw new NotFoundException();
    }

    if ('user' in updateRaketDto) {
      throw new BadRequestException('Changing the user of a raket is not allowed.');
    }

    Object.assign(findRaket, updateRaketDto);
    return await this.raket.save(findRaket);
  }

  async remove(racketId: number) {
    const findRaket = await this.findOne(racketId);

    if (!findRaket) {
      throw new NotFoundException();
    }

    return await this.raket.delete(racketId);
  }
}
