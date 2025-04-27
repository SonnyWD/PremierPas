import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';


@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ){}

  async createArticle(adminId: number, article: CreateArticleDto) {
    const newArticle = this.articleRepository.create({
      ...article,
      adminId,
    });
    return await this.articleRepository.save(newArticle);
  }

  async updateArticle(id: number, updateArticle: UpdateArticleDto): Promise<Article>{
    const article = await this.articleRepository.findOne({
      where: { id }
    });

    if(!article){
      throw new NotFoundException(`L'article avec l'ID ${id} est introuvable`);
    }

    if (Object.keys(updateArticle).length === 0) {
      throw new BadRequestException('Aucune donnée à mettre à jour');
    }

    Object.assign(article, updateArticle);

    const updatedArticle = await this.articleRepository.save(article);

    return updatedArticle;
  }

  async removeArticle(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id }
    });

    if(!article){
      throw new NotFoundException(`L'article avec l'ID ${id} est introuvable`);
    }

    await this.articleRepository.remove(article);

    return article;
  }

  async findAllArticles(): Promise<Article[]> {
    return await this.articleRepository.find({
      order: { creationDate: 'DESC' }
    });
  }

  async findOneArticle(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id }
    });

    if(!article) {
      throw new NotFoundException(`L'article avec l'ID ${id} est introuvable`);
    }

    return article;
}
}