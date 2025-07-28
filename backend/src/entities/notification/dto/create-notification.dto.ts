import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UserDto {
  uid: number;
}

export class CreateNotificationDto {
  @IsNotEmpty()
  user: UserDto;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  raketId?: number;

  @IsOptional()
  raket?: any;
}
