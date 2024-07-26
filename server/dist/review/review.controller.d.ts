import { ReviewService } from './review.service';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
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
    findUserReviews(userId: string): Promise<({
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
    create(data: {
        userId: any;
        movieId: any;
        rating: any;
        title: any;
        description: any;
    }): Promise<{
        reviewId: string;
        rating: string;
        title: string;
        description: string;
        createdAt: Date;
        userId: string;
        movieId: string;
    }>;
    delete(reviewId: string): Promise<{
        reviewId: string;
        rating: string;
        title: string;
        description: string;
        createdAt: Date;
        userId: string;
        movieId: string;
    }>;
}
