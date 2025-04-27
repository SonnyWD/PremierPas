import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UpdateArticleDto } from './dto/update-article.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateArticleDto, @Req() req: RequestWithUser) {
    const adminId = req.user['userId'];
    return this.articlesService.createArticle(adminId, dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ){
    return this.articlesService.updateArticle(
      +id,
      updateArticleDto
    )
  }

  @Delete('id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.articlesService.removeArticle(+id);
  }

  @UseGuards()
  @Get()
  findAll() {
    return this.articlesService.findAllArticles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOneArticle(+id);
  }

}
