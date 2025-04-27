import { Module } from '@nestjs/common';
import { TodoListService } from './todo_list.service';
import { TodoListController } from './todo_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo_list.entity';
import { User } from 'src/users/entities/user.entity';
import { ListeCategorie } from 'src/liste_categorie/entities/liste_categorie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, User, ListeCategorie])],
  controllers: [TodoListController],
  providers: [TodoListService],
  exports: [TypeOrmModule, TodoListService]
})
export class TodoListModule {}
