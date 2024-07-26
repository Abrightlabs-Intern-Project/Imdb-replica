<<<<<<< HEAD
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import * as express from 'express';

import { config } from 'aws-sdk';

const binaryMimeTypes: string[] = [];
=======
import { Handler, Context, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
>>>>>>> 09f60e08fcc83ccd89ddf6f8bbc48f6b44b735b0

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
<<<<<<< HEAD
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nestApp.use(eventContext());
    config.update({ region: process.env.REGION });
    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler = async (event: any, context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
=======
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
>>>>>>> 09f60e08fcc83ccd89ddf6f8bbc48f6b44b735b0
