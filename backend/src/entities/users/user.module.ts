import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [TypeOrmModule,.forFeature([Users])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}