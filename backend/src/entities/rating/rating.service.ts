import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { Raket, RaketStatus } from '../rakets/entities/raket.entity';
import { RaketApplication, RaketApplicationStatus } from '../raket-application/entities/raket-application.entity';
import { Users } from '../user/entities/user.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    @InjectRepository(Raket)
    private readonly raketsRepository: Repository<Raket>,
    @InjectRepository(RaketApplication)
    private readonly raketApplicationsRepository: Repository<RaketApplication>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createRatingDto: CreateRatingDto, userId: number, raketId: number) {
    const user = await this.usersRepository.findOne({ where: { uid: userId } });
    if (!user) throw new NotFoundException('User not found');

    const raket = await this.raketsRepository.findOne({ where: { raketId } });
    if (!raket) throw new NotFoundException('Raket not found');

    if (raket.status !== RaketStatus.COMPLETED) {
      throw new BadRequestException('You can only rate completed rakets.');
    }

    // Prevent duplicate ratings
    const existingRating = await this.ratingsRepository.findOne({
      where: { user: { uid: userId }, raket: { raketId } }
    });
    if (existingRating) {
      throw new BadRequestException('You have already rated this raket.');
    }

    const application = await this.raketApplicationsRepository.findOne({
      where: { raket: { raketId }, status: RaketApplicationStatus.ACCEPTED },
      relations: ['raketista'],
    });
    if (!application) {
      throw new BadRequestException('No accepted raketista found for this raket.');
    }

    const rating = this.ratingsRepository.create({
      ...createRatingDto,
      user,
      raket,
      raketistaId: application.raketista.uid,
    });

    return this.ratingsRepository.save(rating);
  }

  findAll() {
    return this.ratingsRepository.find({ relations: ['user', 'raket'] });
  }

  findOne(id: number) {
    return this.ratingsRepository.findOne({ where: { id }, relations: ['user', 'raket'] });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    const rating = await this.ratingsRepository.findOne({ where: { id } });
    if (!rating) throw new NotFoundException('Rating not found');

    Object.assign(rating, updateRatingDto);
    return this.ratingsRepository.save(rating);
  }

  async remove(id: number) {
    const rating = await this.ratingsRepository.findOne({ where: { id } });
    if (!rating) throw new NotFoundException('Rating not found');

    return this.ratingsRepository.remove(rating);
  }
}
