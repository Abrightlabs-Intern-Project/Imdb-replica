import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post('add')
  async addToWatchlist(@Body() data: { movieId: string; userId: string }) {
    return this.watchlistService.add(data.movieId, data.userId);
  }

  @Delete('/remove/:userId/:movieId')
  async removeFromWatchlist(@Param('userId') userId: string, @Param('movieId') movieId: string) {
    return this.watchlistService.remove(movieId, userId);
  }

  @Get('/')
  async getWatchlist(@Query('userId') userId: string) {
    return this.watchlistService.get(userId);
  }
}
