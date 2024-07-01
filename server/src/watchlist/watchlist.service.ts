import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WatchlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(movieId: string, userId: string) {
    return await this.prisma.watchlist.create({
      data: {
        movieId: movieId,
        userId: userId,
      }
    });
  }

  async delete(movieId: string, userId: string) {
    return await this.prisma.watchlist.delete({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: movieId,
        },
      },
    });
  }

  async find(userId: string) {
    return this.prisma.watchlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        movie: true,
      },
    });
  }
}
