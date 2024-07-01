import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieController } from './movie.controller';
import { AwsS3Service } from '../aws/aws.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, PrismaService, AwsS3Service],
})
export class MovieModule {}
