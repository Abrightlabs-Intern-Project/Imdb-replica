import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class WatchlistService {
  constructor(private readonly prisma: PrismaService) {}

  async getWatchlist(userEmail: string): Promise<Movie[]> {
    const watchlist = await this.prisma.watchlist.findMany({
      where: { userEmail },
      include: { movie: true },
    });
    return watchlist.map(watchlistItem => watchlistItem.movie);
  }

  async addToWatchlist(userEmail: string, imdbID: string): Promise<Movie> {
    await this.prisma.watchlist.create({
      data: {
        userEmail,
        imdbID,
      },
    });

    return this.prisma.movie.findUnique({ where: { imdbID } });
  }

  async removeFromWatchlist(userEmail: string, imdbID: string): Promise<boolean> {
    await this.prisma.watchlist.deleteMany({
      where: {
        userEmail,
        imdbID,
      },
    });

    return true;
  }
}
