import { WriterService } from './writer.service';
import { CreateWriterDto } from './dto/create-writer.dto';
export declare class WriterController {
    private readonly writerService;
    constructor(writerService: WriterService);
    create(createWriterDto: CreateWriterDto): Promise<string>;
    findAll(): Promise<{
        writerId: string;
        writerName: string;
    }[]>;
    delete(writerId: string): Promise<{
        message: string;
    }>;
    update(writerId: any, writerName: string): Promise<{
        writerId: string;
        writerName: string;
    }>;
}
