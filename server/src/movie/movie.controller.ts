import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from '../aws/aws.service';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(
    private movieService: MovieService,
    private awsService: AwsS3Service,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('poster'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const key = `poster/${Date.now()}_${file.originalname}`;
    await this.awsService.upload(file, key);
    return { posterKey: key };
  }

  @Get()
  @ApiOkResponse({ type: [Movie] })
  async findAll(): Promise<Movie[]> {
    const movies = await this.movieService.findAll();
    await Promise.all(
      movies.map(async (movie) => {
        const posterKey = movie.poster;
        const posterBuffer = await this.awsService.getImage(posterKey);
        movie.poster = posterBuffer.toString('base64');
      })
    );
    return movies;
  }

 
  @Get(':movieId')
async find(@Param('movieId') movieId: string): Promise<Movie> {
  const movie = await this.movieService.find(movieId);
  const posterKey = movie.poster;
  const posterBuffer = await this.awsService.getImage(posterKey);
  movie.poster = posterBuffer.toString('base64');
  await Promise.all(
    movie.actors.map(async (actor) => {
      const actorKey = actor.imageUrl;
      const actorImg = await this.awsService.getImage(actorKey);
      actor.imageUrl = actorImg.toString('base64');
    })
  );

  return movie;
}

  @Post()
  async create(@Body() createUserDto: CreateMovieDto) {
    return this.movieService.create(createUserDto);
  }

  @Delete(':movieId/:title')
  async delete(
    @Param('movieId') movieId: string,
    @Param('title') title: string,
  ) {
    return this.movieService.delete(movieId);
  }
}
