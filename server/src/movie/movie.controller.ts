import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './models/movie.model';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getMovies(): Promise<Movie[]> {
    return this.movieService.getAllMovies();
  }

  @Get(':movieId')
  async getMovie(@Param('movieId') movieId: string): Promise<Movie> {
    return this.movieService.getAllMovieDetails(movieId);
  }
}
