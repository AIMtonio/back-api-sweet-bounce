import { Test, TestingModule } from '@nestjs/testing';
import { EventsRelationshipController } from './events-relationship.controller';
import { EventsRelationshipService } from './events-relationship.service';

describe('EventsRelationshipController', () => {
  let controller: EventsRelationshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsRelationshipController],
      providers: [EventsRelationshipService],
    }).compile();

    controller = module.get<EventsRelationshipController>(EventsRelationshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
