import { RaketCategory, RaketStatus } from "../entities/raket.entity";
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Type } from "class-transformer";

export class CreateRaketDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(RaketStatus)
  status?: RaketStatus;

  @IsEnum(RaketCategory)
  category: RaketCategory

  @IsNumber()
  @Type(() => Number)
  budget: number;

}
