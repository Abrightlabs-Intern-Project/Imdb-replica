import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile,UseInterceptors} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from '../aws/aws.service';
import { UpdateMovieDto } from './dto/update-movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService, private awsService: AwsS3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('poster'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const key = `poster/${Date.now()}_${file.originalname}`;
    await this.awsService.upload(file, key);
    return { posterKey: key };
  }

  @Get('search')
  async search(@Query('title') title: string, @Query('rated') rated: string, @Query('selectedGenre') selectedGenre: string,
    @Query('minRating') minRating: string, @Query('maxRating') maxRating: string, @Query('releaseYearFrom') releaseYearFrom: string, @Query('releaseYearTo') releaseYearTo: string): Promise<Movie[]> {
    return this.movieService.search(title, rated, selectedGenre, minRating, maxRating, releaseYearFrom, releaseYearTo);
  }

  @Get()
  @ApiOkResponse({ type: [Movie] })
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get(':movieId')
  async find(@Param('movieId') movieId: string): Promise<Movie> {
    return this.movieService.find(movieId);
  }

  @Put(':movieId')
  async update(@Param('movieId') movieId: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(movieId, updateMovieDto);
  }

  @Delete(':movieId')
  async delete(@Param('movieId') movieId: string) {
    return this.movieService.delete(movieId);
  }
}
