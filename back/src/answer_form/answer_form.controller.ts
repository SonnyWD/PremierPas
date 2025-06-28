import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AnswerFormService } from './answer_form.service';
import { CreateAnswerFormDto } from './dto/create-answer_form.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('answer-form')
export class AnswerFormController {
  constructor(private readonly answerFormService: AnswerFormService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  create(
    @Body() createAnswerFormDto: CreateAnswerFormDto,
    @Request() req,
    @Param('formId') formId: string,
  ) {
    return this.answerFormService.submitAnswer(
      +req.user.id,
      +formId,
      createAnswerFormDto,
    );
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll(@Request() req) {
    return this.answerFormService.findAll(req.user.id);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.answerFormService.findOne(+id);
  }
}
