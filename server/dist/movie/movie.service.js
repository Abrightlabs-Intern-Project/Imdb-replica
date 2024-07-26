"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MovieService = class MovieService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.movie.findMany({
            include: {
                genres: true
            }
        });
    }
    async find(movieId) {
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
    async delete(movieId) {
        return await this.prisma.movie.delete({
            where: {
                movieId,
            },
        });
    }
    async update(movieId, updateMovieDto) {
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
        });
    }
    async create(createMovieDto) {
        const { title, year, rated, released, runtime, plot, language, awards, poster, trailer, metascore, rating, votes, boxOffice, actors, genres, countries, directors, writers, } = createMovieDto;
        await this.prisma.movie.create({
            data: { title, year, rated, released, runtime, plot, language, awards, poster, trailer, metascore, rating, votes,
                boxOffice,
                countries: { connect: countries.map((countryId) => ({ countryId })),
                },
                genres: { connect: genres.map((genreId) => ({ genreId })),
                },
                directors: { connect: directors.map((directorId) => ({ directorId })),
                },
                writers: { connect: writers.map((writerId) => ({ writerId })),
                },
                actors: { connect: actors.map((actorId) => ({ actorId })),
                },
            },
        });
    }
    async search(title, rated, selectedGenre, minRating, maxRating, releaseYearFrom, releaseYearTo) {
        const searchFilters = {
            ...(title && { title: { contains: title } }),
            ...(rated && { rated: { equals: rated } }),
            ...(selectedGenre && { genres: { some: { genreId: selectedGenre } } }),
            ...(minRating && { rating: { gte: minRating } }),
            ...(maxRating && { rating: { lte: maxRating } }),
            ...(releaseYearFrom && { year: { gte: releaseYearFrom } }),
            ...(releaseYearTo && { year: { lte: releaseYearTo } }),
        };
        const movies = await this.prisma.movie.findMany({
            where: searchFilters,
        });
        return movies;
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MovieService);
//# sourceMappingURL=movie.service.js.map