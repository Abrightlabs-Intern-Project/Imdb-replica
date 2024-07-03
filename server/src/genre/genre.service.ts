import { BadRequestException, Injectable } from '@nestjs/common';
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

  async delete(genreId: string) {
    const genre = await this.prisma.genre.findUnique({
      where: { genreId },
      include: { movies: true },
    });
    if (genre.movies.length > 0) {
      throw new BadRequestException(`Genre with ID ${genreId} is associated with movies and cannot be deleted`);
    }
    await this.prisma.genre.delete({
      where: { genreId },
    });
  }
}
