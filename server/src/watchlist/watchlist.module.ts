import { Module } from '@nestjs/common';
import { WatchlistResolver } from './watchlist.resolver';
import { WatchlistService } from './watchlist.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WatchlistController } from './watchlist.controller';

@Module({
  providers: [WatchlistResolver, WatchlistService, PrismaService],
  controllers: [WatchlistController],
})

export class WatchlistModule {}
