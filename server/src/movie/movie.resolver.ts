import { Resolver, Query, Args } from '@nestjs/graphql';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';

@Resolver()
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => [Movie])
  async movies() {
    return this.movieService.findAll();
  }

  @Query(() => Movie)
  async getMovie(@Args('imdbID') imdbID: string) {
    return this.movieService.findOne(imdbID);
  }
}
