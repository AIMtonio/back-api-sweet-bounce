import { Test, TestingModule } from '@nestjs/testing';
import { CatFormaPagoService } from './cat-forma-pago.service';

describe('CatFormaPagoService', () => {
  let service: CatFormaPagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatFormaPagoService],
    }).compile();

    service = module.get<CatFormaPagoService>(CatFormaPagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
