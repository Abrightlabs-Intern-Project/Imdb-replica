import { WatchlistService } from './watchlist.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
export declare class WatchlistController {
    private readonly watchlistService;
    constructor(watchlistService: WatchlistService);
    create(data: CreateWatchlistDto): Promise<{
        watchlistId: string;
        userId: string;
        movieId: string;
    }>;
    delete(userId: string, movieId: string): Promise<{
        watchlistId: string;
        userId: string;
        movieId: string;
    }>;
    find(userId: string): Promise<({
        movie: {
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
        };
    } & {
        watchlistId: string;
        userId: string;
        movieId: string;
    })[]>;
}
