import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { Raket, RaketStatus } from '../rakets/entities/raket.entity';
import { RaketApplication, RaketApplicationStatus } from '../raket-application/entities/raket-application.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    @InjectRepository(Raket)
    private readonly raketsRepository: Repository<Raket>,
    @InjectRepository(Raket)
    private readonly raketApplicationsRepository: Repository<RaketApplication>,
  ) {}
  // rate completed rakets
  async rateRaket(
    posterId: number,
    raketId: number,
    rating: number,
    review?: string,
  ) {
    const raket = await this.raketsRepository.findOne({
      where: { raketId },
      relations: ['user'],
    });
    if (!raket || raket.status !== RaketStatus.COMPLETED) {
      throw new BadRequestException('Raket not completed yet.');
    }
    if (raket.user.uid !== posterId) {
      throw new ForbiddenException('Only the poster can rate this raket.');
    }
    //fetches the raketista using the raket application (accepted raketista)
    const acceptedApplication = await this.raketApplicationsRepository.findOne({
      where: {
        raket: { raketId },
        status: RaketApplicationStatus.ACCEPTED,
      },
      relations: ['raketista'],
    });
    if (!acceptedApplication) {
      throw new BadRequestException('No accepted raketista for this raket.');
    }
    const raketista = acceptedApplication.raketista;

    //checks if the rating already exists
    const existingRating = await this.ratingsRepository.findOne({
      where: {
        poster: { uid: posterId },
        raket: { raketId },
      },
    });
    if (existingRating) {
      throw new BadRequestException('You have already rated this raket.');
    }

    const newRating = this.ratingsRepository.create({
      rating,
      review,
      poster: raket.user,
      raketista,
      raket,
    });

    return this.ratingsRepository.save(newRating);
  }


  create(createRatingDto: CreateRatingDto) {
    return 'This action adds a new rating';
  }

  findAll() {
    return `This action returns all rating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }

  
}
