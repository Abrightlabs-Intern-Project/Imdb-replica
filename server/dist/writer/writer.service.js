"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WriterService = class WriterService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrGet(writerDto) {
        const { writerName } = writerDto;
        let writer = await this.prisma.writer.findUnique({ where: { writerName } });
        if (!writer) {
            writer = await this.prisma.writer.create({
                data: {
                    writerName
                },
            });
        }
        return writer.writerId;
    }
    async create(createWriterDto) {
        return await this.prisma.writer.create({
            data: createWriterDto
        });
    }
    async findAll() {
        return await this.prisma.writer.findMany();
    }
    async delete(writerId) {
        const writer = await this.prisma.writer.findUnique({
            where: { writerId },
            include: { movies: true },
        });
        if (writer.movies.length > 0) {
            throw new common_1.BadRequestException(`Writer ${writer.writerName} is associated with movies and cannot be deleted`);
        }
        await this.prisma.writer.delete({
            where: { writerId },
        });
    }
    async update(writerId, writerName) {
        return await this.prisma.writer.update({
            where: {
                writerId
            },
            data: {
                writerName
            }
        });
    }
};
exports.WriterService = WriterService;
exports.WriterService = WriterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WriterService);
//# sourceMappingURL=writer.service.js.map