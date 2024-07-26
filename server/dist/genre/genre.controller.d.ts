import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { AwsS3Service } from '../aws/aws.service';
export declare class GenreController {
    private readonly genreService;
    private awsService;
    constructor(genreService: GenreService, awsService: AwsS3Service);
    create(createGenreDto: CreateGenreDto): Promise<string>;
    findAll(): Promise<{
        genreId: string;
        genreName: string;
    }[]>;
    find(genreId: string): Promise<{
        movies: {
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
        }[];
    } & {
        genreId: string;
        genreName: string;
    }>;
    delete(genreId: string): Promise<{
        message: string;
    }>;
    update(genreId: string, genreName: string): Promise<{
        genreId: string;
        genreName: string;
    }>;
}
