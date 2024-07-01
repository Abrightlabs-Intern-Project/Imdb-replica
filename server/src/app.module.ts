import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';
import { GenreModule } from './genre/genre.module';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { ReviewModule } from './review/review.module';
import { DirectorModule } from './director/director.module';
import { CountryModule } from './country/country.module';
import { WriterModule } from './writer/writer.module';

@Module({
  imports: [
    MovieModule,
    ActorModule,
    GenreModule,
    UserModule,
    WatchlistModule,
    ReviewModule,
    DirectorModule,
    CountryModule,
    WriterModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
