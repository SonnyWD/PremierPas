import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccessContentService } from './access_content.service';

@Controller('access-content')
export class AccessContentController {
  constructor(private readonly accessContentService: AccessContentService) {}
}
