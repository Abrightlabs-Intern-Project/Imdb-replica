import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorResolver } from './director.resolver';

@Module({
  providers: [DirectorService, DirectorResolver]
})
export class DirectorModule {}
