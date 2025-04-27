import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo_list.dto';
import { UpdateTodoListDto } from './dto/update-todo_list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from './entities/todo_list.entity';
import { User } from 'src/users/entities/user.entity';
import { ListeCategorie } from 'src/liste_categorie/entities/liste_categorie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private todoRepository: Repository<TodoList>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(ListeCategorie)
    private categorieRepository: Repository<ListeCategorie>,
  ) {}

  private async findTodoOrFail(id: number, userId: number): Promise<TodoList> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user']
    });
    if (!todo) {
      throw new NotFoundException("Todo non trouvé ou non autorisé");
    }
    return todo;
  }
  
  async createTodo(createTodoDto: CreateTodoListDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    const categorie = await this.categorieRepository.findOne({
      where: { id: createTodoDto.categorieId },
    });
    if (!categorie) {
      throw new NotFoundException('Catégorie non trouvée');
    }
  
    const todo = this.todoRepository.create({
      title: createTodoDto.title,
      description: createTodoDto.description,
      user,
      categorie,
    });
    return this.todoRepository.save(todo);
  }

  async findAllTodos(userId: number): Promise<TodoList[]> {
    return await this.todoRepository.find({
      where: {user: { id: userId}},
      relations: ['user']
    })
  }

  async findOneTodo(id: number, userId: number): Promise<TodoList> {
    return this.findTodoOrFail(id, userId);
  }

  async updateTodo(id: number, updateTodoListDto: UpdateTodoListDto, userId: number,
  ): Promise<TodoList> {
    const existingTodo = await this.findTodoOrFail(id, userId);
    Object.assign(existingTodo, updateTodoListDto);
    return await this.todoRepository.save(existingTodo);
  }

  async removeTodo(id: number, userId: number) {
    const existingTodo = await this.findTodoOrFail(id, userId);
    return await this.todoRepository.remove(existingTodo);
  }
}
