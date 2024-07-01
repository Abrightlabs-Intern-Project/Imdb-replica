import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Genre } from './entities/genre.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { AwsS3Service } from 'src/aws/aws.service';

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
  async getAllGenres() {
    return this.genreService.findAll();
  }

  @Get(':genreId')
  @ApiOkResponse({ type: Genre })
  async getMovie(@Param('genreId') genreId: string) {
    const genres = await this.genreService.find(genreId);
    for(let i=0;i<genres.movies.length;i++) {
      const posterKey = genres.movies[i].poster; 
      const posterBuffer = await this.awsService.getImage(posterKey);
      genres.movies[i].poster = posterBuffer.toString('base64');
    }
    return genres
  }
}
