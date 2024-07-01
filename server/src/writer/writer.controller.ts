import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WriterService } from './writer.service';
import { CreateWriterDto } from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('writer')
@Controller('writer')
export class WriterController {
  constructor(private readonly writerService: WriterService) {}

  @Post()
  create(@Body() createWriterDto: CreateWriterDto) {
    return this.writerService.createOrGet(createWriterDto);
  }
}
