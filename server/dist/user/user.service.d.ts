import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userName: string, userId: string): Promise<{
        userId: string;
        userName: string;
        createdAt: Date;
        favouriteGenreId: string;
    }>;
    find(userId: string): Promise<{
        userId: string;
        userName: string;
        createdAt: Date;
        favouriteGenreId: string;
    }>;
}
