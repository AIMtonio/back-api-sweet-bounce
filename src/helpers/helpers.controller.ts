import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { CreateHelperDto } from './dto/create-helper.dto';
import { UpdateHelperDto } from './dto/update-helper.dto';

@Controller('helpers')
export class HelpersController {
  constructor(private readonly helpersService: HelpersService) {}

}
