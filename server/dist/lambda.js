"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const middleware_1 = require("aws-serverless-express/middleware");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const aws_sdk_1 = require("aws-sdk");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const aws_serverless_express_1 = require("aws-serverless-express");
const binaryMimeTypes = [];
let cachedServer;
async function bootstrapServer() {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        nestApp.use((0, middleware_1.eventContext)());
        aws_sdk_1.config.update({ region: process.env.REGION });
        await nestApp.init();
        cachedServer = (0, aws_serverless_express_1.createServer)(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}
const handler = async (event, context) => {
    cachedServer = await bootstrapServer();
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map