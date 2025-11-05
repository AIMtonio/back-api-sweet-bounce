import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipCalendarController } from './relationship-calendar.controller';
import { RelationshipCalendarService } from './relationship-calendar.service';

describe('RelationshipCalendarController', () => {
  let controller: RelationshipCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelationshipCalendarController],
      providers: [RelationshipCalendarService],
    }).compile();

    controller = module.get<RelationshipCalendarController>(RelationshipCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
