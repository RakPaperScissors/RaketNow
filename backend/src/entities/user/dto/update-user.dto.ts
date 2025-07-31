import { IsOptional, IsString} from 'class-validator';
import { userRole } from '../entities/user.entity';

export class UpdateUserDto {

  @IsOptional()
  @IsString()
  bio?: string;

}