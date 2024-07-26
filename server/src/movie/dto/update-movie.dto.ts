import { OmitType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUrl } from 'class-validator';

export class UpdateMovieDto {
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
}
