import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(userName: string, userId) {
        return await this.prisma.user.create({
            data: {
                userName,
                userId
            }
        })
    }

    async findUser(userId: string) {
        return await this.prisma.user.findUnique({
            where: {
                userId
            }
        })
    }
}
