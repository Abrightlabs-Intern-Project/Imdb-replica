import { Resolver, Query } from '@nestjs/graphql';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';

@Resolver()
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => [Movie])
  async movies() {
    return this.movieService.findAll();
  }
}
