import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {movies} from '../data/data';
import { v4 as uuidv4 } from 'uuid';



async function main() {
    await prisma.movieCountry.deleteMany();
    await prisma.movieGenre.deleteMany();
    await prisma.movieDirector.deleteMany();
    await prisma.movieWriter.deleteMany();
    await prisma.movieActor.deleteMany();
    await prisma.movie.deleteMany();
    await prisma.country.deleteMany();
    await prisma.genre.deleteMany();
    await prisma.director.deleteMany();
    await prisma.writer.deleteMany();
    await prisma.actor.deleteMany();
  
    for (const movie of movies) {
      const countries = movie.country.split(',').map(country => country.trim());
      const genres = movie.genre.split(',').map(genre => genre.trim());
      const directors = movie.director.split(',').map(director => director.trim());
      const writers = movie.writer.split(',').map(writer => writer.trim());
      const actors = movie.actors.split(',').map(actor => actor.trim());
  
      const countryIds = [];
      for (const countryName of countries) {
        let country = await prisma.country.findUnique({ where: { countryName } });
        if (!country) {
          country = await prisma.country.create({
            data: { countryId: uuidv4(), countryName },
          });
        }
        countryIds.push(country.countryId);
      }
  
      const genreIds = [];
      for (const genreName of genres) {
        let genre = await prisma.genre.findUnique({ where: { genreName } });
        if (!genre) {
          genre = await prisma.genre.create({
            data: { genreId: uuidv4(), genreName },
          });
        }
        genreIds.push(genre.genreId);
      }
  
      const directorIds = [];
      for (const directorName of directors) {
        let director = await prisma.director.findUnique({ where: { directorName } });
        if (!director) {
          director = await prisma.director.create({
            data: { directorId: uuidv4(), directorName },
          });
        }
        directorIds.push(director.directorId);
      }
  
      const writerIds = [];
      for (const writerName of writers) {
        let writer = await prisma.writer.findUnique({ where: { writerName } });
        if (!writer) {
          writer = await prisma.writer.create({
            data: { writerId: uuidv4(), writerName },
          });
        }
        writerIds.push(writer.writerId);
      }
  
      const actorIds = [];
      for (const actorName of actors) {
        let actor = await prisma.actor.findUnique({ where: { actorName } });
        if (!actor) {
          actor = await prisma.actor.create({
            data: { actorId: uuidv4(), actorName, imageUrl: 'https://example.com/default.jpg' },
          });
        }
        actorIds.push(actor.actorId);
      }
  
        await prisma.movie.create({
            data: {
            movieId: movie.movieId,
            title: movie.title,
            year: movie.year,
            rated: movie.rated,
            released: movie.released,
            runtime: movie.runtime,
            plot: movie.plot,
            language: movie.language,
            awards: movie.awards,
            poster: movie.poster,
            trailer: movie.trailer,
            metascore: movie.metascore,
            rating: movie.rating,
            votes: movie.votes,
            boxOffice: movie.boxOffice,
            countries: { create: countryIds.map(countryId => ({ countryId })) },
            genres: { create: genreIds.map(genreId => ({ genreId })) },
            directors: { create: directorIds.map(directorId => ({ directorId })) },
            writers: { create: writerIds.map(writerId => ({ writerId })) },
            actors: { create: actorIds.map(actorId => ({ actorId })) },
            },
        });
    }
  }
  
  main()
    .then(async () => {
      console.log("success")
    })
    .catch(async (e) => {
      console.error(e);
    });