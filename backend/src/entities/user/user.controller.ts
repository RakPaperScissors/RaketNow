import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userRole } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // CRUD operations for USER entity
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @Roles('admin')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.patch(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // Search and Filter functions
  @Get('search/name/:name')
  searchByName(@Param('name') name: string) {
    return this.userService.searchByName(name);
  }

  @Get('search/email/:email')
  searchByEmail(@Param('email') email: string) {
    return this.userService.searchByEmail(email);
  }

  @Get('search/role/:role')
  filterByRole(@Param('role') role: userRole) {
    return this.userService.filterByRole(role);
  }

  @Patch('change-role/:uid')
  changeRole(@Param('uid') uid: number, @Body('role') role: userRole) {
    return this.userService.changeRole(uid, role);
  }

  @Patch('update-profile-pic/:uid')
  updateProfilePicture(@Param('uid') uid: number, @Body('profilePicture') profilePicture: string) {
    return this.userService.updateProfilePicture(uid, profilePicture);
  }
}
