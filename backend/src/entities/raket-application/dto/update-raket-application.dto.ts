import { PartialType } from '@nestjs/mapped-types';
import { CreateRaketApplicationDto } from './create-raket-application.dto';

export class UpdateRaketApplicationDto extends PartialType(CreateRaketApplicationDto) {}
