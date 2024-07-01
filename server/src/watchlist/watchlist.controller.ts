import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { Watchlist } from './entities/watchlist.entity';

@ApiTags('watchlist')
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  @ApiCreatedResponse({ type: Watchlist })
  async create(@Body() data: CreateWatchlistDto) {
    return this.watchlistService.create(data.movieId, data.userId);
  }

  @Delete(':userId/:movieId')
  @ApiOkResponse({ type: Watchlist })
  async delete(@Param('userId') userId: string, @Param('movieId') movieId: string) {
    return this.watchlistService.delete(movieId, userId);
  }

  @Get()
  @ApiOkResponse({ type: Watchlist, isArray: true })
  async find(@Query('userId') userId: string) {
    return this.watchlistService.find(userId);
  }
}
