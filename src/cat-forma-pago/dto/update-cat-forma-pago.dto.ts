import { PartialType } from '@nestjs/swagger';
import { CreateCatFormaPagoDto } from './create-cat-forma-pago.dto';

export class UpdateCatFormaPagoDto extends PartialType(CreateCatFormaPagoDto) {}
