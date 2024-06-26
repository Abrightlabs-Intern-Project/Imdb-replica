import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movie/models/movie.model';

export class Genre {
  @ApiProperty()
  genreId: string;

  @ApiProperty()
  genreName: string;

  @ApiProperty({ required: false })
  movie: Movie;
}
