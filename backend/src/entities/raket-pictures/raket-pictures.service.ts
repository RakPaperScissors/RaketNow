import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaketPictureDto } from './dto/create-raket-picture.dto';
import { UpdateRaketPictureDto } from './dto/update-raket-picture.dto';
import { Raket } from '../rakets/entities/raket.entity';
import { RaketPictures } from './entities/raket-picture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RaketPicturesService {
  constructor (
    @InjectRepository(Raket)
    private readonly raket: Repository<Raket>,
    @InjectRepository(RaketPictures)
    private readonly raketPictures: Repository<RaketPictures>) {
  }

  async create(createRaketPictureDto: CreateRaketPictureDto, file: Express.Multer.File) {
    const raket = await this.raket.findOne({ where: { raketId: createRaketPictureDto.raketId } });
    if (!raket) {
      throw new NotFoundException('Raket not found');
    }

    const maxOrderResult = await this.raketPictures
      .createQueryBuilder('raket_pictures')
      .select('MAX(raket_pictures.displayOrder)', 'maxOrder')
      .where('raket_pictures.raket_id = :raketId', { raketId: raket.raketId })
      .getRawOne();

    const newDisplayOrder = (maxOrderResult.maxOrder !== null) ? maxOrderResult.maxOrder + 1 : 0;

    const imageUrl = `https://your-storage-url.com/${file.filename}`;

    const newPicture = this.raketPictures.create({
      raket: raket,
      imageUrl: imageUrl,
      displayOrder: newDisplayOrder,
    });

    return await this.raketPictures.save(newPicture);
  }

  findAll() {
    return `This action returns all raketPictures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} raketPicture`;
  }

  update(id: number, updateRaketPictureDto: UpdateRaketPictureDto) {
    return `This action updates a #${id} raketPicture`;
  }

  remove(id: number) {
    return `This action removes a #${id} raketPicture`;
  }
}
