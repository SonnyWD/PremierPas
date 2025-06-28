import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('update-points')
  async updatePoints(@Req() req: RequestWithUser) {
    const user = req.user as any;
    const updatedUser = await this.usersService.userPoint(user.id);
    return { points: updatedUser.point };
  }

  @Post('me/favorites')
  async addFavorite(
    @Req() req: RequestWithUser,
    @Body('toolId', ParseIntPipe) toolId: number,
  ) {
    return this.usersService.addFavoriteTool(req.user.id, toolId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneUser(id);
  }

  @Get('me/favorites')
  async getFavorites(@Req() req: RequestWithUser) {
    return this.usersService.getFavoriteTools(req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user as any;
    if (user.role !== Role.ADMIN && user.sub !== id) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que votre propre compte.',
      );
    }
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('me/favorites/:toolId')
  async removeFavorite(
    @Req() req: RequestWithUser,
    @Param('toolId', ParseIntPipe) toolId: number,
  ) {
    return this.usersService.removeFavoriteTool(req.user.id, toolId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    const user = req.user as any;
    if (user.role !== Role.ADMIN && user.sub !== id) {
      throw new ForbiddenException(
        'Vous ne pouvez supprimer que votre propre compte.',
      );
    }
    return this.usersService.removeUser(id);
  }
}
