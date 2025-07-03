import { PartialType } from '@nestjs/mapped-types';
import { CreateCertificationDto } from './create-certification.dto';

export class UpdateCertificationDto extends PartialType(CreateCertificationDto) {}
