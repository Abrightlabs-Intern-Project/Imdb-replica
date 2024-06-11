import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WatchlistService } from './watchlist.service';
import { Movie } from 'src/movie/models/movie.model';

@Resolver()
export class WatchlistResolver {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Query(() => [Movie])
  async getWatchlist(@Args('userEmail') userEmail: string): Promise<Movie[]> {
    return this.watchlistService.getWatchlist(userEmail);
  }

  @Mutation(() => Movie)
  async addToWatchlist(
    @Args('userEmail') userEmail: string,
    @Args('imdbID') imdbID: string,
  ): Promise<Movie> {
    return this.watchlistService.addToWatchlist(userEmail, imdbID);
  }

  @Mutation(() => Boolean)
  async removeFromWatchlist(
    @Args('userEmail') userEmail: string,
    @Args('imdbID') imdbID: string,
  ): Promise<boolean> {
    return this.watchlistService.removeFromWatchlist(userEmail, imdbID);
  }
}
