"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const movie_module_1 = require("./movie/movie.module");
const actor_module_1 = require("./actor/actor.module");
const genre_module_1 = require("./genre/genre.module");
const prisma_service_1 = require("./prisma/prisma.service");
const user_module_1 = require("./user/user.module");
const watchlist_module_1 = require("./watchlist/watchlist.module");
const review_module_1 = require("./review/review.module");
const director_module_1 = require("./director/director.module");
const country_module_1 = require("./country/country.module");
const writer_module_1 = require("./writer/writer.module");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            movie_module_1.MovieModule,
            actor_module_1.ActorModule,
            genre_module_1.GenreModule,
            user_module_1.UserModule,
            watchlist_module_1.WatchlistModule,
            review_module_1.ReviewModule,
            director_module_1.DirectorModule,
            country_module_1.CountryModule,
            writer_module_1.WriterModule,
        ],
        providers: [prisma_service_1.PrismaService],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map