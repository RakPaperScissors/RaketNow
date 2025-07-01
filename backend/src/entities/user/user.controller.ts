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

  // --- Basic CRUD Functions ---
  // POSTs new user
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @Roles('admin')
  // GETs all users
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // GETs user by uid
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // PATCHes user by uid
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.patch(+id, updateUserDto);
  }

  // DELETEs user by uid
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // --- Search and Filter functions ---
  // GETs user by name
  @Get('search/name/:name')
  searchByName(@Param('name') name: string) {
    return this.userService.searchByName(name);
  }

  // GETs user by email
  @Get('search/email/:email')
  searchByEmail(@Param('email') email: string) {
    return this.userService.searchByEmail(email);
  }

  // GETs users by role
  @Get('search/role/:role')
  filterByRole(@Param('role') role: userRole) {
    return this.userService.filterByRole(role);
  }

  // PATCHes user's role by uid
  @Patch('change-role/:uid')
  changeRole(@Param('uid') uid: number, @Body('role') role: userRole) {
    return this.userService.changeRole(uid, role);
  }

  // PATCHes user's profile picture by uid
  @Patch('update-profile-pic/:uid')
  updateProfilePicture(@Param('uid') uid: number, @Body('profilePicture') profilePicture: string) {
    return this.userService.updateProfilePicture(uid, profilePicture);
  }
}
