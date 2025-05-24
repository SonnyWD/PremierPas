import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessContentService } from './access_content.service';
import { CreateAccessContentDto } from './dto/create-access_content.dto';
import { UpdateAccessContentDto } from './dto/update-access_content.dto';

@Controller('access-content')
export class AccessContentController {
  constructor(private readonly accessContentService: AccessContentService) {}
}
