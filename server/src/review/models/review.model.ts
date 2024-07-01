import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';

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
