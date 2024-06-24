import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorResolver } from './actor.resolver';
import { ActorController } from './actor.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ActorService, ActorResolver, PrismaService],
  controllers: [ActorController]
})
export class ActorModule {}
