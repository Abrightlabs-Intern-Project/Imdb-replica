import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.directorService.findAll()
  }

  @Delete(":directorId")
  async delete(@Param("directorId") directorId: string) {
    try {
      await this.directorService.delete(directorId);
      return { message: 'Director successfully deleted' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
