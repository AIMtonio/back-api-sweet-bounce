import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RelationshipCalendarService } from './relationship-calendar.service';
import { CreateRelationshipCalendarDto } from './dto/create-relationship-calendar.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Controller('relationship-calendar')
export class RelationshipCalendarController {

  constructor(
    private readonly relationshipCalendarService: RelationshipCalendarService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() createRelationshipCalendarDto: CreateRelationshipCalendarDto) {
    return await this.relationshipCalendarService.create(createRelationshipCalendarDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('findRelationshipByCalendar')
  async findRelationshipByCalendar(@Body() createRelationshipCalendarDto: CreateRelationshipCalendarDto) {
    return await this.relationshipCalendarService.findMyEventsRelationshipByCalendar(createRelationshipCalendarDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('findRelationshipByUser')
  async findRelationshipByUser(@Body() createRelationshipCalendarDto: CreateRelationshipCalendarDto) {
    return await this.relationshipCalendarService.findClientByCveCustomCalendar(createRelationshipCalendarDto.cve_calendar);
  }

}
