/// <reference types="multer" />
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { AwsS3Service } from '../aws/aws.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MovieController {
    private movieService;
    private awsService;
    constructor(movieService: MovieService, awsService: AwsS3Service);
    upload(file: Express.Multer.File): Promise<{
        posterKey: string;
    }>;
    search(title: string, rated: string, selectedGenre: string, minRating: string, maxRating: string, releaseYearFrom: string, releaseYearTo: string): Promise<Movie[]>;
    findAll(): Promise<Movie[]>;
    create(createMovieDto: CreateMovieDto): Promise<void>;
    find(movieId: string): Promise<Movie>;
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
}
