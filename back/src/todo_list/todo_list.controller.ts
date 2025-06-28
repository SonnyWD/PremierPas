import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo_list.dto';
import { UpdateTodoListDto } from './dto/update-todo_list.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { TodoListService } from './todo_list.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('todos')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post('custom')
  async createCustom(@Request() req, @Body() createTodoDto: CreateTodoListDto) {
    return this.todoListService.createCustomTodo(createTodoDto, req.user.id);
  }

  @Post('activate-suggested/:key')
  async activateSuggested(@Request() req, @Param('key') key: string) {
    return this.todoListService.activateSuggestedTodo(+key, req.user.id);
  }

  @Get('user')
  async findAllUserTodos(@Request() req) {
    return this.todoListService.findAllUserTodos(req.user.id);
  }

  @Get('suggested')
  async findAllSuggestedTodos(@Request() req) {
    return this.todoListService.findAllSuggestedTemplates(req.user.id);
  }

  @Get(':id')
  async findOneTodo(@Param('id') id: string, @Request() req) {
    return this.todoListService.findOneTodo(+id, req.user.id);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoListDto,
    @Request() req,
  ) {
    return this.todoListService.updateTodo(+id, updateTodoDto, req.user.id);
  }

  @Delete(':id')
  async removeTodo(@Param('id') id: string, @Request() req) {
    return this.todoListService.removeTodo(+id, req.user.id);
  }
}
