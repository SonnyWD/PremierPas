import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tool } from 'src/tools/entities/tool.entity';
import { ToolsModule } from 'src/tools/tools.module'; 
import { PregnancyModule } from 'src/pregnancy/pregnancy.module'; 
import { MedicalAppointementModule } from 'src/medical_appointement/medical_appointement.module';
import { MoodModule } from 'src/mood/mood.module';
import { MediaBabyModule } from 'src/media_baby/media_baby.module';
import { AnswerFormModule } from 'src/answer_form/answer_form.module';
import { QuizModule } from 'src/quiz/quiz.module';
import { TodoListModule } from 'src/todo_list/todo_list.module';
import { ListeCategorieModule } from 'src/liste_categorie/liste_categorie.module';
import { LikePublicationModule } from 'src/like_publication/like_publication.module';
import { LikeCommentModule } from 'src/like_comment/like_comment.module';
import { PublicationModule } from 'src/publication/publication.module';
import { CommentsModule } from 'src/comments/comments.module';
import { MessagesModule } from 'src/messages/messages.module';
import { SponsorshipModule } from 'src/sponsorship/sponsorship.module';


@Module({
  imports: [TypeOrmModule.forFeature([User, Tool]),
                ToolsModule,                            
                PregnancyModule,                         
                MedicalAppointementModule,
                MoodModule,
                MediaBabyModule,
                AnswerFormModule,
                QuizModule,
                TodoListModule,
                ListeCategorieModule,
                LikePublicationModule,
                LikeCommentModule,
                PublicationModule,
                CommentsModule,
                MessagesModule,
                SponsorshipModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
