import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { AwsS3Service } from 'src/aws/aws.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ActorService, PrismaService, AwsS3Service],
  controllers: [ActorController]
})
export class ActorModule {}
