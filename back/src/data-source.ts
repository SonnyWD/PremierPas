import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/entities/user.entity';
import { Pregnancy } from './pregnancy/entities/pregnancy.entity';
import { Baby } from './baby/entities/baby.entity';
import { MedicalAppointement } from './medical_appointement/entities/medical_appointement.entity';
import { AppointementType } from './appointement_type/entities/appointement_type.entity';
import { Article } from './articles/entities/article.entity';
import { Notification } from './notifications/entities/notification.entity';
import { Mood } from './mood/entities/mood.entity';
import { MediaBaby } from './media_baby/entities/media_baby.entity';
import { AnswerForm } from './answer_form/entities/answer_form.entity';
import { Quiz } from './quiz/entities/quiz.entity';
import { TodoList } from './todo_list/entities/todo_list.entity';
import { Publication } from './publication/entities/publication.entity';
import { LikeComment } from './like_comment/entities/like_comment.entity';
import { LikePublication } from './like_publication/entities/like_publication.entity';
import { Comment } from './comments/entities/comment.entity';
import { Message } from './messages/entities/message.entity';
import { Sponsorship } from './sponsorship/entities/sponsorship.entity';
import { Question } from './questions/entities/question.entity';
import { Tool } from './tools/entities/tool.entity';
import { AccessContent } from './access_content/entities/access_content.entity';
import { BabyDaily } from './baby_daily/entities/baby_daily.entity';
import { BabyMeasure } from './baby_measure/entities/baby_measure.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User, Pregnancy, Baby, MedicalAppointement, AppointementType, Article, Notification, Mood, MediaBaby, AnswerForm, Quiz, TodoList, Publication, LikePublication, Comment, LikeComment, Message, Sponsorship, Question, Tool, AccessContent, BabyMeasure, BabyDaily],
  migrations: [process.env.NODE_ENV === 'production' ? 'dist/migration/**/*.js' : 'src/migration/**/*.ts'],
  synchronize: false,
});
