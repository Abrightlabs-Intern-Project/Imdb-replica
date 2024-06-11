import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/auth/models/user.model';
import { Movie } from 'src/movie/models/movie.model';

@ObjectType()
export class Watchlist {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => Movie)
  movie: Movie;
}
