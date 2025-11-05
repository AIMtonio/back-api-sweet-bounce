import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsRelationshipService } from './events-relationship.service';
import { CreateEventsRelationshipDto } from './dto/create-events-relationship.dto';
import { UpdateEventsRelationshipDto } from './dto/update-events-relationship.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Controller('events-relationship')
export class EventsRelationshipController {

  constructor(
    private readonly eventsRelationshipService: EventsRelationshipService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() createEventsRelationshipDto: CreateEventsRelationshipDto) {
    return await this.eventsRelationshipService.create(createEventsRelationshipDto);
  }

}
