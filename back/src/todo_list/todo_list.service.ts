import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from './entities/todo_list.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoListDto } from './dto/create-todo_list.dto';
import { UpdateTodoListDto } from './dto/update-todo_list.dto';
import { Role } from 'src/auth/role.enum';
import { SUGGESTED_TODOS } from './suggested-todos-data';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private userTodoRepository: Repository<TodoList>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async findUserTodoOrFail(
    id: number,
    userId: number,
  ): Promise<TodoList> {
    const todo = await this.userTodoRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
    if (!todo) {
      throw new NotFoundException('Todo non trouvée ou non autorisée.');
    }
    return todo;
  }

  async createCustomTodo(
    createTodoDto: CreateTodoListDto,
    userId: number,
  ): Promise<TodoList> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const todo = this.userTodoRepository.create({
      title: createTodoDto.title,
      description: createTodoDto.description,
      isCustom: true,
      completed: false,
      user,
      suggestedTodoKey: null,
    });
    return this.userTodoRepository.save(todo);
  }

  async activateSuggestedTodo(
    suggestedTodoKey: number,
    userId: number,
  ): Promise<TodoList> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const suggestedTodo = SUGGESTED_TODOS.find(
      (s) => s.key === suggestedTodoKey,
    );
    if (!suggestedTodo) {
      throw new NotFoundException('Suggestion de To-Do non trouvée.');
    }

    if (
      suggestedTodo.isPremium &&
      user.role !== Role.ADMIN.toString() &&
      user.role !== Role.PREMIUM_USER.toString()
    ) {
      throw new ForbiddenException(
        'Cette suggestion est réservée aux utilisateurs premium.',
      );
    }

    if (
      user.role !== Role.ADMIN.toString() &&
      user.role !== Role.PREMIUM_USER.toString()
    ) {
      const { In } = require('typeorm');
      const activeSuggestedTodos = await this.userTodoRepository.count({
        where: {
          user: { id: userId },
          isCustom: false,
          suggestedTodoKey: In(
            SUGGESTED_TODOS.filter((suggested) => !suggested.isPremium).map(
              (s) => s.key,
            ),
          ),
        },
      });

      if (activeSuggestedTodos >= 2) {
        throw new BadRequestException(
          'Vous avez déjà atteint la limite de 2 To-Do suggérées non premium.',
        );
      }
    }

    const existingUserTodo = await this.userTodoRepository.findOne({
      where: { user: { id: userId }, suggestedTodoKey: suggestedTodo.key },
    });
    if (existingUserTodo) {
      throw new BadRequestException(
        'Cette suggestion de To-Do a déjà été ajoutée à votre liste.',
      );
    }

    const userTodo = this.userTodoRepository.create({
      title: suggestedTodo.title,
      description: suggestedTodo.taches
        .map((t) => `- ${t.description}`)
        .join('\n'),
      isCustom: false,
      completed: false,
      user,
      suggestedTodoKey: suggestedTodo.key,
    });

    return this.userTodoRepository.save(userTodo);
  }

  async findAllUserTodos(userId: number): Promise<TodoList[]> {
    return await this.userTodoRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  async findAllSuggestedTemplates(userId: number): Promise<any[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const activatedKeys = (
      await this.userTodoRepository.find({
        where: { user: { id: userId }, isCustom: false },
        select: ['suggestedTodoKey'],
      })
    ).map((todo) => todo.suggestedTodoKey);

    const suggestedTodosForUser = SUGGESTED_TODOS.map((suggestion) => ({
      ...suggestion,
      isActivated: activatedKeys.includes(suggestion.key),
    }));

    if (
      user.role === Role.ADMIN.toString() ||
      user.role === Role.PREMIUM_USER.toString()
    ) {
      return suggestedTodosForUser;
    } else {
      return suggestedTodosForUser;
    }
  }

  async findOneTodo(id: number, userId: number): Promise<TodoList> {
    const todo = await this.findUserTodoOrFail(id, userId);
    return todo;
  }

  async updateTodo(
    id: number,
    updateTodoDto: UpdateTodoListDto,
    userId: number,
  ): Promise<TodoList> {
    const existingTodo = await this.findUserTodoOrFail(id, userId);

    if (!existingTodo.isCustom) {
      throw new BadRequestException(
        'Les To-Do suggérées ne peuvent pas être modifiées, seulement marquées comme complétées.',
      );
    }

    Object.assign(existingTodo, updateTodoDto);
    return await this.userTodoRepository.save(existingTodo);
  }

  async removeTodo(id: number, userId: number): Promise<TodoList> {
    const existingTodo = await this.findUserTodoOrFail(id, userId);
    return await this.userTodoRepository.remove(existingTodo);
  }
}
