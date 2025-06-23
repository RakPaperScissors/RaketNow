import { PartialType } from '@nestjs/mapped-types';
import { CreateRaketistaDto } from './create-raketista.dto';

export class UpdateRaketistaDto extends PartialType(CreateRaketistaDto) {}
