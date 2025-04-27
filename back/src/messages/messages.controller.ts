import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    createMessageDto.userId = req.user.id;
    return this.messagesService.sendMessage(createMessageDto);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.messagesService.findAllMessages(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, userId: number) {
    return this.messagesService.findOneMessage(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto, @Request() req) {
    const userId = req.user.id;
    return this.messagesService.updateMessage(id, userId, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Request() req) {
    const userId = req.user.id;
    return this.messagesService.removeMessage(id, userId);
  }
}
