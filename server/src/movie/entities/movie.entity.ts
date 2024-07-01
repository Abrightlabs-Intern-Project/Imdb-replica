import { ApiProperty } from "@nestjs/swagger";

export class Movie {
  @ApiProperty()
  movieId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  year: string;

  @ApiProperty()
  rated: string;

  @ApiProperty()
  released: string;

  @ApiProperty()
  runtime: string;

  @ApiProperty()
  plot: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  awards: string;

  @ApiProperty()
  poster: string;

  @ApiProperty()
  trailer: string;

  @ApiProperty()
  metascore: string;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  votes: string;

  @ApiProperty()
  boxOffice: string;
}