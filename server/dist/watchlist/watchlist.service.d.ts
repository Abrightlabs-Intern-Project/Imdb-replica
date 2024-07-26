import { PrismaService } from '../prisma/prisma.service';
export declare class WatchlistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(movieId: string, userId: string): Promise<{
        watchlistId: string;
        userId: string;
        movieId: string;
    }>;
    delete(movieId: string, userId: string): Promise<{
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
