import { CreateWriterDto } from './dto/create-writer.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class WriterService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrGet(writerDto: CreateWriterDto): Promise<string>;
    create(createWriterDto: CreateWriterDto): Promise<{
        writerId: string;
        writerName: string;
    }>;
    findAll(): Promise<{
        writerId: string;
        writerName: string;
    }[]>;
    delete(writerId: string): Promise<void>;
    update(writerId: string, writerName: string): Promise<{
        writerId: string;
        writerName: string;
    }>;
}
