import { Module } from '@nestjs/common';
import { WriterResolver } from './writer.resolver';
import { WriterService } from './writer.service';

@Module({
  providers: [WriterResolver, WriterService]
})
export class WriterModule {}
