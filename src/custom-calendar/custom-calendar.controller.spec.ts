import { Test, TestingModule } from '@nestjs/testing';
import { CustomCalendarController } from './custom-calendar.controller';
import { CustomCalendarService } from './custom-calendar.service';

describe('CustomCalendarController', () => {
  let controller: CustomCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomCalendarController],
      providers: [CustomCalendarService],
    }).compile();

    controller = module.get<CustomCalendarController>(CustomCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
