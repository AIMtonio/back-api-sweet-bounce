import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomCalendarService } from './custom-calendar.service';
import { CreateCustomCalendarDto } from './dto/create-custom-calendar.dto';
import { UpdateCustomCalendarDto } from './dto/update-custom-calendar.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Controller('custom-calendar')
export class CustomCalendarController {
  
  constructor(
    private readonly customCalendarService: CustomCalendarService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() createCustomCalendarDto: CreateCustomCalendarDto) {
    return await this.customCalendarService.createNewCustomCalendar(createCustomCalendarDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('findByUuidUser')
  async findByUuidUser(@Body() createCustomCalendarDto: CreateCustomCalendarDto) {
    return await this.customCalendarService.findByUuidUser(createCustomCalendarDto.uuid_user);
  }

}
