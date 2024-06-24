import { Resolver, Query, Args } from '@nestjs/graphql';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Resolver()
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => [Movie])
  async movies() {
    return this.movieService.getAllMovies();
  }

  @Query(() => Movie)
  async getMovie(@Args('movieId') movieId: string) {
    return this.movieService.getAllMovieDetails(movieId);
  }
}
