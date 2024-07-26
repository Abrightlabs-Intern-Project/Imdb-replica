import { PrismaService } from '../prisma/prisma.service';
export declare class ReviewService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    find(movieId: string): Promise<({
        user: {
            userId: string;
            userName: string;
            createdAt: Date;
            favouriteGenreId: string;
        };
    } & {
        reviewId: string;
        rating: string;
        title: string;
        description: string;
        createdAt: Date;
        userId: string;
        movieId: string;
    })[]>;
    findUserReviws(userId: string): Promise<({
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
        reviewId: string;
        rating: string;
        title: string;
        description: string;
        createdAt: Date;
        userId: string;
        movieId: string;
    })[]>;
    create(userId: string, movieId: string, rating: string, title: string, description: string): Promise<{
        reviewId: string;
        rating: string;
        title: string;
        description: string;
        createdAt: Date;
        userId: string;
        movieId: string;
    }>;
    delete(reviewId: any): Promise<{
        reviewId: string;
        rating: string;
        title: string;
        description: string;
        createdAt: Date;
        userId: string;
        movieId: string;
    }>;
}
