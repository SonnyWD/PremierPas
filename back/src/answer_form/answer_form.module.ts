import { forwardRef, Module } from '@nestjs/common';
import { AnswerFormService } from './answer_form.service';
import { AnswerFormController } from './answer_form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerForm } from './entities/answer_form.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerForm]),
    forwardRef(() => UsersModule),
  ],
  controllers: [AnswerFormController],
  providers: [AnswerFormService],
  exports: [TypeOrmModule, AnswerFormService],
})
export class AnswerFormModule {}
