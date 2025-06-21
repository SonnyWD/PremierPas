import { Module } from '@nestjs/common';
import { TodoListService } from './todo_list.service';
import { TodoListController } from './todo_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo_list.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, User])],
  controllers: [TodoListController],
  providers: [TodoListService],
  exports: [TypeOrmModule, TodoListService]
})
export class TodoListModule {}
