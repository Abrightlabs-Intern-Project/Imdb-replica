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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: 'graphql',
    }),
    MovieModule,
    ActorModule,
    GenreModule,
    UserModule,
    WatchlistModule,
    ReviewModule
  ],
  providers: [PrismaService],
})
export class AppModule {}
