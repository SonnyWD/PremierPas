// src/tools/tools.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from './entities/tool.entity';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool)
    private toolRepository: Repository<Tool>,
  ) {}

  create(createToolDto: CreateToolDto) {
    const tool = this.toolRepository.create(createToolDto);
    return this.toolRepository.save(tool);
  }

  findAll() {
    return this.toolRepository.find();
  }

  async findOne(id: number) {
    const tool = await this.toolRepository.findOneBy({ id });
    if (!tool) throw new NotFoundException(`Tool #${id} not found`);
    return tool;
  }

  async update(id: number, updateToolDto: UpdateToolDto) {
    await this.findOne(id); 
    await this.toolRepository.update(id, updateToolDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const tool = await this.findOne(id);
    return this.toolRepository.remove(tool);
  }
}
