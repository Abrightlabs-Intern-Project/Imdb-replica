import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { AwsS3Service } from '../aws/aws.service';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService, private awsService: AwsS3Service) {}

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.createOrGet(createGenreDto);
  }

  @Get()
  @ApiOkResponse({ type: Genre, isArray: true })
  async findAll() {
    return this.genreService.findAll();
  }

  @Get(':genreId')
  @ApiOkResponse({ type: Genre })
  async find(@Param('genreId') genreId: string) {
    return this.genreService.find(genreId);
  }

  @Delete(":genreId")
  async delete(@Param("genreId") genreId: string) {
    try {
      await this.genreService.delete(genreId);
      return { message: 'Genre successfully deleted' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
      }
    }
  }
  
  @Patch(":genreId")
  async update(@Param("genreId") genreId: string, @Body("genreName") genreName: string) {
    return this.genreService.update(genreId, genreName);
  }
}
