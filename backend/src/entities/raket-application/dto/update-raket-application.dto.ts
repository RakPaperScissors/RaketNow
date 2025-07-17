import { IsOptional, IsNumber } from 'class-validator';

export class UpdateRaketApplicationDto {
  @IsOptional()
  @IsNumber()
  priceProposal?: number;

  @IsOptional()
  @IsNumber()
  budget?: number;
}