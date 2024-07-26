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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReviewService = class ReviewService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async find(movieId) {
        return await this.prisma.review.findMany({
            where: {
                movieId
            },
            include: {
                user: true
            }
        });
    }
    async findUserReviws(userId) {
        return await this.prisma.review.findMany({
            where: {
                userId
            },
            include: {
                movie: true
            }
        });
    }
    async create(userId, movieId, rating, title, description) {
        return await this.prisma.review.create({
            data: {
                userId,
                movieId,
                rating,
                title,
                description
            },
        });
    }
    async delete(reviewId) {
        return await this.prisma.review.delete({
            where: {
                reviewId
            }
        });
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewService);
//# sourceMappingURL=review.service.js.map