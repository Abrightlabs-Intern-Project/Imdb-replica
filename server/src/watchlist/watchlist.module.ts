import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WatchlistController } from './watchlist.controller';

@Module({
  providers: [WatchlistService, PrismaService],
  controllers: [WatchlistController],
})

export class WatchlistModule {}
