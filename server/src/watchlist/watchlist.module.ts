import { Module } from '@nestjs/common';
import { WatchlistResolver } from './watchlist.resolver';
import { WatchlistService } from './watchlist.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [WatchlistResolver, WatchlistService, PrismaService],
})

export class WatchlistModule {}
