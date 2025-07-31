import { IsNumber, IsOptional } from 'class-validator';

export class CreateRaketApplicationDto {
  @IsNumber()
  raketistaId: number;

  @IsNumber()
  raketId: number;

}
