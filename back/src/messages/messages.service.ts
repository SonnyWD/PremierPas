import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async sendMessage(createMessageDto: CreateMessageDto) {
    const { userId, title, content, sendingDate, receveurId } =
      createMessageDto;

    const sender = await this.userRepository.findOne({ where: { id: userId } });
    if (!sender) {
      throw new NotFoundException('Utilisateur non trouvé.');
    }

    const receveur = await this.userRepository.findOne({
      where: { id: receveurId },
    });
    if (!receveur) {
      throw new NotFoundException('Destinataire non trouvé.');
    }

    const message = this.messageRepository.create({
      title,
      content,
      sendingDate,
      envoyeur: sender,
      receveur: receveur,
    });

    await this.messageRepository.save(message);

    return { message: 'Message envoyé avec succès.' };
  }

  async findAllMessages(userId: number): Promise<Message[]> {
    return await this.messageRepository.find({
      where: [
        { envoyeur: { id: userId }, isDeletedBySender: false },
        { receveur: { id: userId }, isDeletedByReceiver: false },
      ],
      relations: ['envoyeur', 'receveur'],
      order: {
        sendingDate: 'DESC',
      },
    });
  }

  async findOneMessage(id: number, userId: number): Promise<Message> {
    const existingMessage = await this.messageRepository.findOne({
      where: { id },
      relations: ['envoyeur', 'receveur'],
    });

    if (!existingMessage) {
      throw new NotFoundException(`Message introuvable.`);
    }

    const isSenderOrReceiver =
      existingMessage.envoyeur.id === userId ||
      existingMessage.receveur.id === userId;

    if (!isSenderOrReceiver) {
      throw new NotFoundException(`Vous n'avez pas accès à ce message.`);
    }

    return existingMessage;
  }

  async updateMessage(
    id: number,
    userId: number,
    dto: UpdateMessageDto,
  ): Promise<Message> {
    throw new ForbiddenException(
      "La modification des messages n'est pas autorisée.",
    );
  }

  async removeMessage(id: number, userId: number): Promise<Message> {
    const existingMessage = await this.messageRepository.findOne({
      where: { id },
      relations: ['envoyeur', 'receveur'],
    });

    if (!existingMessage) {
      throw new NotFoundException(`Message introuvable.`);
    }

    if (existingMessage.envoyeur.id === userId) {
      existingMessage.isDeletedBySender = true;
    } else if (existingMessage.receveur.id === userId) {
      existingMessage.isDeletedByReceiver = true;
    } else {
      throw new ForbiddenException('Vous ne pouvez pas supprimer ce message.');
    }
    await this.messageRepository.save(existingMessage);

    return existingMessage;
  }
}
