import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateRaketApplicationDto {
  @IsOptional()
  @IsNumber()
  priceProposal?: number;

  @IsOptional()
  @IsString()
  status?: string;
}