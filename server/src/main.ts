import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
