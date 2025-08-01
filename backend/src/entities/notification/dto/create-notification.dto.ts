import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  uid: number;
}
export class RaketDto {
  raketId: number;
}
export class RaketApplicationDto {
  applicationId: number;
}
export class CreateNotificationDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  raketId?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => RaketDto)
  raket?: RaketDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RaketApplicationDto)
  raketApplication?: RaketApplicationDto;

  @IsOptional()
  actionable?: boolean;
}
