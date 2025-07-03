import { CreateRaketPictureDto } from './dto/create-raket-picture.dto';
import { UpdateRaketPictureDto } from './dto/update-raket-picture.dto';
import { Raket } from '../rakets/entities/raket.entity';
import { RaketPictures } from './entities/raket-picture.entity';
import { Repository } from 'typeorm';
export declare class RaketPicturesService {
    private readonly raket;
    private readonly raketPictures;
    constructor(raket: Repository<Raket>, raketPictures: Repository<RaketPictures>);
    create(createRaketPictureDto: CreateRaketPictureDto, file: Express.Multer.File): Promise<RaketPictures>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRaketPictureDto: UpdateRaketPictureDto): string;
    remove(id: number): string;
}
