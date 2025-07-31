import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}