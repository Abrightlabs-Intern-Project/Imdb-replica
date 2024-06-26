import { Controller, Get, Param } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Genre } from './models/genre.model';
import { Movie } from 'src/movie/models/movie.model';

@ApiTags('genres')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOkResponse({ type: Genre, isArray: true })
  async getAllGenres() {
    return this.genreService.getAllGenres();
  }

  @Get(':genreId')
  @ApiOkResponse({ type: Genre, isArray: true })
  async getMovie(@Param('genreId') genreId: string) {
    return this.genreService.getMovie(genreId);
  }
}
