import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.writerService.findAll()
  }

  @Delete(":writerId") 
   async delete(@Param("writerId") writerId: string) {
    try {
      await this.writerService.delete(writerId);
      return { message: 'Writer successfully deleted' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
