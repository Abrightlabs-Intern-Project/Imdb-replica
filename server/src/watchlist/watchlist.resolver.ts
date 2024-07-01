import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WatchlistService } from './watchlist.service';

@Resolver()
export class WatchlistResolver {
  constructor(private readonly watchlistService: WatchlistService) {}
}
