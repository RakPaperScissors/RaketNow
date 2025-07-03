import { PartialType } from '@nestjs/mapped-types';
import { CreateRaketDto } from './create-raket.dto';

export class UpdateRaketDto extends PartialType(CreateRaketDto) {}
