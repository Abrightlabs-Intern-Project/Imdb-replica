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
exports.AwsS3Service = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_s3_1 = require("@aws-sdk/client-s3");
let AwsS3Service = class AwsS3Service {
    constructor(prisma) {
        this.prisma = prisma;
        this.s3Client = new client_s3_1.S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            },
        });
    }
    async upload(file, key) {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentDisposition: 'inline',
        };
        try {
            const command = new client_s3_1.PutObjectCommand(params);
            const response = await this.s3Client.send(command);
            console.log('Upload successful', response);
        }
        catch (err) {
            console.error('Error uploading file:', err);
            throw err;
        }
    }
};
exports.AwsS3Service = AwsS3Service;
exports.AwsS3Service = AwsS3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AwsS3Service);
//# sourceMappingURL=aws.service.js.map