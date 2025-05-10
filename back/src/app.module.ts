import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
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
import { ListeCategorieModule } from './liste_categorie/liste_categorie.module';
import { TodoList } from './todo_list/entities/todo_list.entity';
import { ListeCategorie } from './liste_categorie/entities/liste_categorie.entity';
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

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,   
      username: 'root',
      password: 'rootroot',
      database: 'premiers_pas',
      entities: [User, Pregnancy, Baby, MedicalAppointement, AppointementType, Article, Notification, Mood, MediaBaby, AnswerForm, Quiz, TodoList, ListeCategorie, Publication, LikePublication, Comment, LikeComment, Message, Sponsorship, Question, Tool],
      synchronize: true, // à mettre à false en production
      driver: require('mysql2')
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
    ListeCategorieModule,
    PublicationModule,
    LikePublicationModule,
    CommentsModule,
    LikeCommentModule,
    MessagesModule,
    SponsorshipModule,
    QuestionsModule,
    ToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
