import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MovieModule } from './movie/movie.module';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';
import { CountryModule } from './country/country.module';
import { DirectorModule } from './director/director.module';
import { GenreModule } from './genre/genre.module';
import { WriterModule } from './writer/writer.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/api/graphql',
    }),
    MovieModule,
    AuthModule,
    WatchlistModule,
    ReviewModule,
    ActorModule,
    CountryModule,
    DirectorModule,
    GenreModule,
    WriterModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
