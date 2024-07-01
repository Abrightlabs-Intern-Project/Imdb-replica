import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DirectorController],
  providers: [DirectorService, PrismaService],
})
export class DirectorModule {}
