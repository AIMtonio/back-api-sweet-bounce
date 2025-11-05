import { Module } from '@nestjs/common';
import { CatFormaPagoService } from './cat-forma-pago.service';
import { CatFormaPagoController } from './cat-forma-pago.controller';

@Module({
  controllers: [CatFormaPagoController],
  providers: [CatFormaPagoService],
})
export class CatFormaPagoModule {}
