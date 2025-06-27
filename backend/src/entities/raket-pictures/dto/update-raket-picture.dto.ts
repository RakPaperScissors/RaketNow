import { PartialType } from '@nestjs/mapped-types';
import { CreateRaketPictureDto } from './create-raket-picture.dto';

export class UpdateRaketPictureDto extends PartialType(CreateRaketPictureDto) {}
