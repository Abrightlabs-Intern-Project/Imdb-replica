import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('director')
@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.createOrGet(createDirectorDto);
  }
}
