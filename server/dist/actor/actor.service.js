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
exports.ActorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const aws_service_1 = require("../aws/aws.service");
let ActorService = class ActorService {
    constructor(prisma, awsService) {
        this.prisma = prisma;
        this.awsService = awsService;
    }
    async create(actorName, actorkey) {
        const actor = await this.prisma.actor.create({
            data: {
                actorName,
                imageUrl: actorkey,
            },
        });
        return actor.actorId;
    }
    async findAll() {
        return this.prisma.actor.findMany();
    }
    async find(actorId) {
        return this.prisma.actor.findUnique({
            where: {
                actorId
            },
            include: {
                movies: true
            }
        });
    }
    async findWithName(actorName) {
        return this.prisma.actor.findUnique({
            where: {
                actorName
            },
            include: {
                movies: true
            }
        });
    }
    async delete(actorId) {
        const actor = await this.prisma.actor.findUnique({
            where: { actorId },
            include: { movies: true },
        });
        if (actor.movies.length > 0) {
            throw new common_1.BadRequestException(`Actor ${actor.actorName} is associated with movies and cannot be deleted`);
        }
        await this.prisma.actor.delete({
            where: { actorId },
        });
    }
    async update(actorId, actorName, key) {
        return await this.prisma.actor.update({
            where: {
                actorId
            },
            data: {
                actorName,
                imageUrl: key
            }
        });
    }
};
exports.ActorService = ActorService;
exports.ActorService = ActorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, aws_service_1.AwsS3Service])
], ActorService);
//# sourceMappingURL=actor.service.js.map