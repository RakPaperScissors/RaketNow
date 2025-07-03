import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateCertificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  fileURL?: string;

  @IsOptional()
  @IsString()
  issuingOrganization?: string;
}
