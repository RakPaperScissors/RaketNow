import { IsOptional, IsNumber, IsString } from 'class-validator';
import { RaketApplicationStatus } from 'src/entities/raket-application/entities/raket-application.entity';

export class UpdateRaketApplicationDto {

  @IsOptional()
  @IsString()
  status?: RaketApplicationStatus;
}