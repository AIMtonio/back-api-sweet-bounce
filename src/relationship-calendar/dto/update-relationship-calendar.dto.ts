import { PartialType } from '@nestjs/swagger';
import { CreateRelationshipCalendarDto } from './create-relationship-calendar.dto';

export class UpdateRelationshipCalendarDto extends PartialType(CreateRelationshipCalendarDto) {}
