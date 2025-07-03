import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
export class CreateJobHistoryDto {
  @IsNotEmpty()
  historyType: 'Raket' | 'Work_Experience';

  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  raketId?: number;
}
