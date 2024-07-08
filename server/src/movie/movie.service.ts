import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.movie.findMany();
  }

  async find(movieId: string) {
    return await this.prisma.movie.findUnique({
      where: {
        movieId,
      },
      include: {
        actors: true,
        directors: true,
        genres: true,
        countries: true,
        writers: true,
      },
    });
  }

  async delete(movieId: string) {
    return await this.prisma.movie.delete({
      where: {
        movieId,
      },
    });
  }

  async update(movieId: string, updateMovieDto: UpdateMovieDto) {
    return await this.prisma.movie.update({
      where: {
        movieId
      },
      data: {
        title: updateMovieDto.title,
        year: updateMovieDto.year,
        rated: updateMovieDto.rated,
        released: updateMovieDto.released,
        runtime: updateMovieDto.runtime,
        plot: updateMovieDto.plot,
        language: updateMovieDto.language,
        awards: updateMovieDto.awards,
        poster: updateMovieDto.poster,
        trailer: updateMovieDto.trailer,
        metascore: updateMovieDto.metascore,
        rating: updateMovieDto.rating,
        votes: updateMovieDto.votes,
        boxOffice: updateMovieDto.boxOffice
      }
    })
  }

  async create(createMovieDto: CreateMovieDto) {
    const {
      title,
      year,
      rated,
      released,
      runtime,
      plot,
      language,
      awards, 
      poster,
      trailer,
      metascore,
      rating,
      votes,
      boxOffice,
      actors,
      genres,
      countries,
      directors,
      writers,
    } = createMovieDto;

    await this.prisma.movie.create({
      data: {
        title,
        year,
        rated,
        released,
        runtime,
        plot,
        language,
        awards,
        poster,
        trailer,
        metascore,
        rating,
        votes,
        boxOffice,
        countries: {
          connect: countries.map((countryId) => ({ countryId })),
        },
        genres: {
          connect: genres.map((genreId: string) => ({ genreId })),
        },
        directors: {
          connect: directors.map((directorId: string) => ({ directorId })),
        },
        writers: {
          connect: writers.map((writerId: string) => ({ writerId })),
        },
        actors: {
          connect: actors.map((actorId: string) => ({ actorId })),
        },
      },
    });
  }
}
