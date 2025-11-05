import { Injectable } from '@nestjs/common';
import { CreateCatFormaPagoDto } from './dto/create-cat-forma-pago.dto';
import { UpdateCatFormaPagoDto } from './dto/update-cat-forma-pago.dto';

@Injectable()
export class CatFormaPagoService {
  create(createCatFormaPagoDto: CreateCatFormaPagoDto) {
    return 'This action adds a new catFormaPago';
  }

  findAll() {
    return `This action returns all catFormaPago`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catFormaPago`;
  }

  update(id: number, updateCatFormaPagoDto: UpdateCatFormaPagoDto) {
    return `This action updates a #${id} catFormaPago`;
  }

  remove(id: number) {
    return `This action removes a #${id} catFormaPago`;
  }
}
