import { ApiProperty } from '@nestjs/swagger';
// import { Movie } from 'src/movie/models/movie.model';
// import { User } from 'src/user/models/user.model';

export class Watchlist {
  @ApiProperty()
  watchlistId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  movieId: string;
}
