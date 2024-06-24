import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WatchlistService } from './watchlist.service';
import { Movie } from 'src/movie/models/movie.model';

@Resolver()
export class WatchlistResolver {
  constructor(private readonly watchlistService: WatchlistService) {}
}
