import { Controller, Get } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Actor } from './models/actor.model';

@ApiTags('actors')
@Controller('actor')
export class ActorController {
    constructor(private readonly actorService: ActorService) {}

    @Get()
    @ApiOkResponse({ type: Actor, isArray: true })
    async getAllActors() {
        return this.actorService.getAllActors();
    }
}
