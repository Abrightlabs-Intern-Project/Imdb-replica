import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorResolver } from './actor.resolver';

@Module({
  providers: [ActorService, ActorResolver]
})
export class ActorModule {}
