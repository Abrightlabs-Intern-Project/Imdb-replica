/// <reference types="multer" />
import { PrismaService } from '../prisma/prisma.service';
export declare class AwsS3Service {
    private prisma;
    private s3Client;
    constructor(prisma: PrismaService);
    upload(file: Express.Multer.File, key: string): Promise<void>;
}
