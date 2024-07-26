import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('IMDb Replica API')
    .setDescription('API documentation for the IMDb replica application')
    .setVersion('1.0')
    .addTag('movies')
    .addTag('actor')
    .addTag('director')
    .addTag('writer')
    .addTag('country')
    .addTag('genre')
    .addTag('users')
    .addTag('watchlist')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin,Accept,Authorization,Content-Type,X-Requested-With',
    credentials: true,
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();