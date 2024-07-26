import { ApiProperty } from '@nestjs/swagger';
import { Country, Director, Writer } from '@prisma/client';
import { IsArray, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  movieId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  year: string;

  @ApiProperty()
  @IsString()
  rated: string;

  @ApiProperty()
  @IsString()
  released: string;

  @ApiProperty()
  @IsString()
  runtime: string;

  @ApiProperty()
  @IsString()
  plot: string;

  @ApiProperty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsString()
  awards: string;

  @ApiProperty()
  @IsString()
  poster: string;

  @ApiProperty()
  @IsUrl()
  trailer: string;

  @ApiProperty()
  @IsString()
  metascore: string;

  @ApiProperty()
  @IsString()
  rating: string;

  @ApiProperty()
  @IsString()
  votes: string;

  @ApiProperty()
  @IsString()
  boxOffice: string;

  @ApiProperty()
  @IsArray()
  actors: string[];

  @ApiProperty()
  @IsArray()
  directors: string[];

  @ApiProperty()
  @IsArray()
  writers: string[];

  @ApiProperty()
  @IsArray()
  genres: string[];

  @ApiProperty()
  @IsArray()
  countries: string[];
}
