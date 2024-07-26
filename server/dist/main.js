"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("./prisma/prisma.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('IMDb Replica API')
        .setDescription('API documentation for the IMDb replica application')
        .setVersion('1.0')
        .addTag('movies')
        .addTag('actor')
        .addTag('director')
        .addTag('writer')
        .addTag('country')
        .addTag('genre')
        .addTag('users')
        .addTag('watchlist')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Origin,Accept,Authorization,Content-Type,X-Requested-With',
        credentials: true,
    });
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map