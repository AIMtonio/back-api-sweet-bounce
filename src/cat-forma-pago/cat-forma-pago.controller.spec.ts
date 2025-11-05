import { Test, TestingModule } from '@nestjs/testing';
import { CatFormaPagoController } from './cat-forma-pago.controller';
import { CatFormaPagoService } from './cat-forma-pago.service';

describe('CatFormaPagoController', () => {
  let controller: CatFormaPagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatFormaPagoController],
      providers: [CatFormaPagoService],
    }).compile();

    controller = module.get<CatFormaPagoController>(CatFormaPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
