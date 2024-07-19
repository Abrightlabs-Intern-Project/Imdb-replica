import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.movie.findMany({
      include: {
        genres: true
      }
    });
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
    const { title, year, rated, released, runtime, plot, language, awards, poster, trailer, metascore, rating, votes,
      boxOffice, actors, genres, countries, directors, writers,
    } = createMovieDto;

    await this.prisma.movie.create({
      data: { title, year, rated, released, runtime, plot, language, awards, poster, trailer, metascore, rating, votes,
        boxOffice,
        countries: { connect: countries.map((countryId) => ({ countryId })),
        },
        genres: { connect: genres.map((genreId: string) => ({ genreId })),
        },
        directors: { connect: directors.map((directorId: string) => ({ directorId })),
        },
        writers: { connect: writers.map((writerId: string) => ({ writerId })),
        },
        actors: { connect: actors.map((actorId: string) => ({ actorId })),
        },
      },
    });
  }

  async search(title?: string, rated?: string, selectedGenre?: string, minRating?: string, maxRating?: string,
    releaseYearFrom?: string, releaseYearTo?: string) {
    const searchFilters: any = {
      ...(title && { title: { contains: title } }),
      ...(rated && { rated: { equals: rated } }),
      ...(selectedGenre && { genres: { some: { genreId: selectedGenre } } }),
      ...(minRating && { rating: { gte: minRating } }),
      ...(maxRating && { rating: { lte: maxRating } }),
      ...(releaseYearFrom && { year: { gte: releaseYearFrom } }),
      ...(releaseYearTo && { year: { lte: releaseYearTo } }),
    };

    console.log(searchFilters);

    const movies = await this.prisma.movie.findMany({
      where: searchFilters,
    });

    return movies;
  }
}
