import { PartialType } from '@nestjs/swagger';
import { CreateEventsRelationshipDto } from './create-events-relationship.dto';

export class UpdateEventsRelationshipDto extends PartialType(CreateEventsRelationshipDto) {}
