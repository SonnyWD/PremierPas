import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards } from '@nestjs/common';
import { TodoListService } from './todo_list.service';
import { CreateTodoListDto } from './dto/create-todo_list.dto';
import { UpdateTodoListDto } from './dto/update-todo_list.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  create(@Request() req, @Body() createTodoListDto: CreateTodoListDto) {
    return this.todoListService.createTodo(createTodoListDto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.todoListService.findAllTodos(req.user.id); 
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.todoListService.findOneTodo(+id, req.user.id); 
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
    @Request() req,
  ) {
    return this.todoListService.updateTodo(+id, updateTodoListDto, req.user.id); 
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.todoListService.removeTodo(+id, req.user.id); 
  }
}
