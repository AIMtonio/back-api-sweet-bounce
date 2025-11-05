import { Test, TestingModule } from '@nestjs/testing';
import { EventsRelationshipService } from './events-relationship.service';

describe('EventsRelationshipService', () => {
  let service: EventsRelationshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsRelationshipService],
    }).compile();

    service = module.get<EventsRelationshipService>(EventsRelationshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
