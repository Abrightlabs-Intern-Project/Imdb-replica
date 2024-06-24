import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async getAllMovies() {
    return this.prisma.movie.findMany();
  }

  async getAllMovieDetails(movieId: string): Promise<Movie> {
    return await this.prisma.movie.findUnique({
      where: {
        movieId,
      },
      include: {
        actors: {
          include: {
            actor: true,
          },
        },
        directors: {
          include: {
            director: true,
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
        countries: {
          include: {
            country: true,
          },
        },
        writers: {
          include: {
            writer: true,
          },
        },
      },
    });
  }
}
