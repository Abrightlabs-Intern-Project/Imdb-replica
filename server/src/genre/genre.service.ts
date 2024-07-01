import { Injectable } from '@nestjs/common';
import { Genre } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrGet(genreDto: CreateGenreDto) {
    const { genreName } = genreDto;

    let genre = await this.prisma.genre.findUnique({ where: { genreName } });

    if (!genre) {
      genre = await this.prisma.genre.create({
        data: {
          genreName
        },
      });
    }
    return genre.genreId;
  }

  async findAll() {
    return await this.prisma.genre.findMany();
  }

  async find(genreId: string) {
    return await this.prisma.genre.findUnique({
      where: {
        genreId,
      },
      include: {
        movies: true,
      },
    });
  }
}
