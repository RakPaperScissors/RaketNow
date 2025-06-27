import { RaketPicturesService } from './raket-pictures.service';
import { CreateRaketPictureDto } from './dto/create-raket-picture.dto';
import { UpdateRaketPictureDto } from './dto/update-raket-picture.dto';
export declare class RaketPicturesController {
    private readonly raketPicturesService;
    constructor(raketPicturesService: RaketPicturesService);
    create(createRaketPictureDto: CreateRaketPictureDto, file: Express.Multer.File): Promise<import("./entities/raket-picture.entity").RaketPictures>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRaketPictureDto: UpdateRaketPictureDto): string;
    remove(id: string): string;
}
