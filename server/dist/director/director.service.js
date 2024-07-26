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
exports.DirectorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DirectorService = class DirectorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrGet(directorDto) {
        const { directorName } = directorDto;
        let director = await this.prisma.director.findUnique({ where: { directorName } });
        if (!director) {
            director = await this.prisma.director.create({
                data: {
                    directorName
                }
            });
        }
        return director.directorId;
    }
    async findAll() {
        return await this.prisma.director.findMany();
    }
    async delete(directorId) {
        const director = await this.prisma.director.findUnique({
            where: { directorId },
            include: { movies: true },
        });
        if (director.movies.length > 0) {
            throw new common_1.BadRequestException(`Director ${director.directorName} is associated with movies and cannot be deleted`);
        }
        await this.prisma.director.delete({
            where: { directorId },
        });
    }
    async update(directorId, directorName) {
        return await this.prisma.director.update({
            where: {
                directorId
            },
            data: {
                directorName
            }
        });
    }
};
exports.DirectorService = DirectorService;
exports.DirectorService = DirectorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DirectorService);
//# sourceMappingURL=director.service.js.map