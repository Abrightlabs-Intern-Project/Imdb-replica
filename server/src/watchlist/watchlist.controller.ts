import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateWatchlistDto } from './create-watchlist.dto';
import { Watchlist } from './models/watchlist.model';

@ApiTags('watchlist')
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post('add')
  @ApiCreatedResponse({ type: Watchlist })
  async addToWatchlist(@Body() data: CreateWatchlistDto) {
    return this.watchlistService.add(data.movieId, data.userId);
  }

  @Delete('remove/:userId/:movieId')
  @ApiOkResponse({ type: Watchlist })
  async removeFromWatchlist(@Param('userId') userId: string, @Param('movieId') movieId: string) {
    return this.watchlistService.remove(movieId, userId);
  }

  @Get('/')
  @ApiOkResponse({ type: Watchlist, isArray: true })
  async getWatchlist(@Query('userId') userId: string) {
    return this.watchlistService.get(userId);
  }
}
