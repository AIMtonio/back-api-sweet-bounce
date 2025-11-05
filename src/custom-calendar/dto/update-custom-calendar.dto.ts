import { PartialType } from '@nestjs/swagger';
import { CreateCustomCalendarDto } from './create-custom-calendar.dto';

export class UpdateCustomCalendarDto extends PartialType(CreateCustomCalendarDto) {}
