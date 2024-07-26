import { Handler, Context, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  return createServer(app.getHttpAdapter().getInstance());
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    console.log('Event:', JSON.stringify(event));
    try {
      if (!cachedServer) {
        cachedServer = await bootstrapServer();
      }
      return proxy(cachedServer, event, context, 'PROMISE').promise;
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  };