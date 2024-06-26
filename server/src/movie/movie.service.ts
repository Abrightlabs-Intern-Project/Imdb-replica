import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.movie.findMany();
  }

  async find(movieId: string): Promise<Movie> {
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

  async delete(movieId: string, title: string) {
    return await this.prisma.movie.delete({
      where: {
        movieId,
        title
      },
    })
  }

  async update(movieId: string) {
    return ''
  }

  async create(createUserDto: CreateMovieDto) {
    const { 
      movieId, 
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
      boxOffice, actors, genres, countries, directors, writers } =
    createUserDto;

    const movie = {
      movieId, 
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
      boxOffice
    }

    const countryIds = [];
    for (const country of countries) {
      let countryRecord = await this.prisma.country.findUnique({ where: { countryName: country.countryName } });
      if (!countryRecord) {
        countryRecord = await this.prisma.country.create({
          data: { countryId: uuidv4(), countryName: country.countryName },
        });
      }
      countryIds.push(countryRecord.countryId);
    }

    const genreIds = [];
    for (const genre of genres) {
      let genreRecord = await this.prisma.genre.findUnique({ where: { genreName: genre.genreName } });
      if (!genreRecord) {
        genreRecord = await this.prisma.genre.create({
          data: { genreId: uuidv4(), genreName: genre.genreName },
        });
      }
      genreIds.push(genreRecord.genreId);
    }

    const directorIds = [];
    for (const director of directors) {
      let directorRecord = await this.prisma.director.findUnique({
        where: { directorName: director.directorName },
      });
      if (!directorRecord) {
        directorRecord = await this.prisma.director.create({
          data: { directorId: uuidv4(), directorName: director.directorName },
        });
      }
      directorIds.push(directorRecord.directorId);
    }

    const writerIds = [];
    for (const writer of writers) {
      let writerRecord = await this.prisma.writer.findUnique({ where: { writerName: writer.writerName } });
      if (!writerRecord) {
        writerRecord = await this.prisma.writer.create({
          data: { writerId: uuidv4(), writerName: writer.writerName },
        });
      }
      writerIds.push(writerRecord.writerId);
    }

    const actorIds = [];
    for (const actor of actors) {
      let actorRecord = await this.prisma.actor.findUnique({ where: { actorName: actor.actorName } });
      const imageUrl = actor.imageUrl
      if (!actorRecord) {
        actorRecord = await this.prisma.actor.create({
          data: { actorId: uuidv4(), actorName: actor.actorName, imageUrl },
        });
      }
      actorIds.push(actorRecord.actorId);
    }

    await this.prisma.movie.create({
      data: {
        ...movie,
        countries: { create: countryIds.map((countryId) => ({ countryId })) },
        genres: { create: genreIds.map((genreId) => ({ genreId })) },
        directors: {
          create: directorIds.map((directorId) => ({ directorId })),
        },
        writers: { create: writerIds.map((writerId) => ({ writerId })) },
        actors: { create: actorIds.map((actorId) => ({ actorId })) },
      },
    });
  }
}
