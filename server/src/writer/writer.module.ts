import { Module } from '@nestjs/common';
import { WriterService } from './writer.service';
import { WriterController } from './writer.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WriterController],
  providers: [WriterService, PrismaService],
})
export class WriterModule {}
