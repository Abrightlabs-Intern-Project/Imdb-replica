import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './models/movie.model';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOkResponse({ type: Movie, isArray: true })
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':movieId')
  @ApiOkResponse({ type: Movie })
  async find(@Param('movieId') movieId: string): Promise<Movie> {
    return this.movieService.find(movieId);
  }

  @Post('add')
  @ApiOkResponse()
  async create(@Body() createUserDto: CreateMovieDto) {
    return this.movieService.create(createUserDto);
  }

  @Delete('delete/:movieId/:title')
  @ApiOkResponse()
  async delete(@Param('movieId') movieId: string, @Param('title') title: string) {
    return this.movieService.delete(movieId, title)
  }

  @Patch('update')
  async update() {  

  }
}
