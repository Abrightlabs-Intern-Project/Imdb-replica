import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.movie.findMany();
  }

  async findOne(imdbID: string): Promise<Movie> {
    return await this.prisma.movie.findUnique({
      where: {
        imdbID,
      },
    });
  }
}
