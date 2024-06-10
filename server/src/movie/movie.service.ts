import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.movie.findMany();
    }
}
