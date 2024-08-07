import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../../movie/entities/movie.entity';

export class Genre {
  @ApiProperty()
  genreId: string;

  @ApiProperty()
  genreName: string;

  @ApiProperty({ required: false })
  movie: Movie;
}
