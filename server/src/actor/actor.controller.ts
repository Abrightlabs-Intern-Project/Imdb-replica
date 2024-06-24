import { Controller, Get, Param } from '@nestjs/common';
import { ActorService } from './actor.service';

@Controller('actor')
export class ActorController {
    constructor(private readonly actorService: ActorService) {}

    @Get()
    async getAllActors() {
        return this.actorService.getAllActors();
    }
}
