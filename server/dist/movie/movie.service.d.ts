import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MovieService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        genres: {
            genreId: string;
            genreName: string;
        }[];
    } & {
        movieId: string;
        title: string;
        year: string;
        rated: string;
        released: string;
        runtime: string;
        plot: string;
        language: string;
        awards: string;
        poster: string;
        trailer: string;
        metascore: string;
        rating: string;
        votes: string;
        boxOffice: string;
    })[]>;
    find(movieId: string): Promise<{
        actors: {
            actorId: string;
            actorName: string;
            imageUrl: string;
        }[];
        directors: {
            directorId: string;
            directorName: string;
        }[];
        writers: {
            writerId: string;
            writerName: string;
        }[];
        genres: {
            genreId: string;
            genreName: string;
        }[];
        countries: {
            countryId: string;
            countryName: string;
        }[];
    } & {
        movieId: string;
        title: string;
        year: string;
        rated: string;
        released: string;
        runtime: string;
        plot: string;
        language: string;
        awards: string;
        poster: string;
        trailer: string;
        metascore: string;
        rating: string;
        votes: string;
        boxOffice: string;
    }>;
    delete(movieId: string): Promise<{
        movieId: string;
        title: string;
        year: string;
        rated: string;
        released: string;
        runtime: string;
        plot: string;
        language: string;
        awards: string;
        poster: string;
        trailer: string;
        metascore: string;
        rating: string;
        votes: string;
        boxOffice: string;
    }>;
    update(movieId: string, updateMovieDto: UpdateMovieDto): Promise<{
        movieId: string;
        title: string;
        year: string;
        rated: string;
        released: string;
        runtime: string;
        plot: string;
        language: string;
        awards: string;
        poster: string;
        trailer: string;
        metascore: string;
        rating: string;
        votes: string;
        boxOffice: string;
    }>;
    create(createMovieDto: CreateMovieDto): Promise<void>;
    search(title?: string, rated?: string, selectedGenre?: string, minRating?: string, maxRating?: string, releaseYearFrom?: string, releaseYearTo?: string): Promise<{
        movieId: string;
        title: string;
        year: string;
        rated: string;
        released: string;
        runtime: string;
        plot: string;
        language: string;
        awards: string;
        poster: string;
        trailer: string;
        metascore: string;
        rating: string;
        votes: string;
        boxOffice: string;
    }[]>;
}
