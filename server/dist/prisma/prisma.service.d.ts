import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private static instance;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}
