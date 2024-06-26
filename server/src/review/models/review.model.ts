import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movie/models/movie.model';
import { User } from 'src/user/models/user.model';

export class Review {
  @ApiProperty()
  reviewId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  movieId: string;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  user: User;

  @ApiProperty()
  movie: Movie;
}
