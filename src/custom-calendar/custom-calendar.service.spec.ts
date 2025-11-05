import { Test, TestingModule } from '@nestjs/testing';
import { CustomCalendarService } from './custom-calendar.service';

describe('CustomCalendarService', () => {
  let service: CustomCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomCalendarService],
    }).compile();

    service = module.get<CustomCalendarService>(CustomCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
