import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { PregnancyModule } from './pregnancy/pregnancy.module';
import { Pregnancy } from './pregnancy/entities/pregnancy.entity';
import { BabyModule } from './baby/baby.module';
import { Baby } from './baby/entities/baby.entity';
import { MedicalAppointementModule } from './medical_appointement/medical_appointement.module';
import { MedicalAppointement } from './medical_appointement/entities/medical_appointement.entity';
import { AppointementTypeModule } from './appointement_type/appointement_type.module';
import { AppointementType } from './appointement_type/entities/appointement_type.entity';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/entities/article.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { Notification } from './notifications/entities/notification.entity';
import { MoodModule } from './mood/mood.module';
import { Mood } from './mood/entities/mood.entity';
import { MediaBabyModule } from './media_baby/media_baby.module';
import { MediaBaby } from './media_baby/entities/media_baby.entity';
import { AnswerFormModule } from './answer_form/answer_form.module';
import { AnswerForm } from './answer_form/entities/answer_form.entity';
import { QuizModule } from './quiz/quiz.module';
import { Quiz } from './quiz/entities/quiz.entity';
import { TodoListModule } from './todo_list/todo_list.module';
import { TodoList } from './todo_list/entities/todo_list.entity';
import { PublicationModule } from './publication/publication.module';
import { Publication } from './publication/entities/publication.entity';
import { LikePublicationModule } from './like_publication/like_publication.module';
import { LikePublication } from './like_publication/entities/like_publication.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { LikeCommentModule } from './like_comment/like_comment.module';
import { LikeComment } from './like_comment/entities/like_comment.entity';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/entities/message.entity';
import { SponsorshipModule } from './sponsorship/sponsorship.module';
import { Sponsorship } from './sponsorship/entities/sponsorship.entity';
import { QuestionsModule } from './questions/questions.module';
import { Question } from './questions/entities/question.entity';
import { ToolsModule } from './tools/tools.module';
import { Tool } from './tools/entities/tool.entity';
import { AccessContentModule } from './access_content/access_content.module';
import { AccessContent } from './access_content/entities/access_content.entity';
import { BabyMeasureModule } from './baby_measure/baby_measure.module';
import { BabyDailyModule } from './baby_daily/baby_daily.module';
import { BabyMeasure } from './baby_measure/entities/baby_measure.entity';
import { BabyDaily } from './baby_daily/entities/baby_daily.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,               
      port: Number(process.env.DB_PORT),             
      username: process.env.DB_USERNAME,      
      password: process.env.DB_PASSWORD,     
      database: process.env.DB_DATABASE,
      entities: [User, Pregnancy, Baby, MedicalAppointement, AppointementType, Article, Notification, Mood, MediaBaby, AnswerForm, Quiz, TodoList, Publication, LikePublication, Comment, LikeComment, Message, Sponsorship, Question, Tool, AccessContent, BabyMeasure, BabyDaily],
      synchronize: true,
      autoLoadEntities: true,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    PregnancyModule,
    BabyModule,
    MedicalAppointementModule,
    AppointementTypeModule,
    ArticlesModule,
    NotificationsModule,
    MoodModule,
    MediaBabyModule,
    AnswerFormModule,
    QuizModule,
    TodoListModule,
    PublicationModule,
    LikePublicationModule,
    CommentsModule,
    LikeCommentModule,
    MessagesModule,
    SponsorshipModule,
    QuestionsModule,
    ToolsModule,
    AccessContentModule,
    BabyMeasureModule,
    BabyDailyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
