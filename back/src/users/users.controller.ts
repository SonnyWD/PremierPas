import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Req, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneUser(id);
  }

  @Patch(':id')
update(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateUserDto: UpdateUserDto,
  @Req() req: RequestWithUser
) {
  const user = req.user as any;
  if (user.role !== Role.ADMIN && user.sub !== id) {
    throw new ForbiddenException("Vous ne pouvez modifier que votre propre compte.");
  }
  return this.usersService.updateUser(id, updateUserDto);
}

@Delete(':id')
remove(
  @Param('id', ParseIntPipe) id: number,
  @Req() req: RequestWithUser
) {
  const user = req.user as any;
  if (user.role !== Role.ADMIN && user.sub !== id) {
    throw new ForbiddenException("Vous ne pouvez supprimer que votre propre compte.");
  }
  return this.usersService.removeUser(id);
}
}
