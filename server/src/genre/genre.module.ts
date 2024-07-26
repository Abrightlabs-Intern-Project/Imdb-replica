import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { PrismaService } from '../prisma/prisma.service';
import { GenreController } from './genre.controller';
import { AwsS3Service } from '../aws/aws.service';

@Module({
  providers: [GenreService, PrismaService, AwsS3Service],
  controllers: [GenreController]
})
export class GenreModule {}
