import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Review {
    reviewId: string;
    userId: string;
    movieId: string;
    rating: string;
    title: string;
    description: string;
    createdAt: Date;
    user: User;
    movie: Movie;
}
