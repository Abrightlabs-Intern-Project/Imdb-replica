import { eventContext } from 'aws-serverless-express/middleware';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { config } from 'aws-sdk';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';

const binaryMimeTypes: string[] = [];

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
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