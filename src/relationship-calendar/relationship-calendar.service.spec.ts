import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipCalendarService } from './relationship-calendar.service';

describe('RelationshipCalendarService', () => {
  let service: RelationshipCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationshipCalendarService],
    }).compile();

    service = module.get<RelationshipCalendarService>(RelationshipCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
