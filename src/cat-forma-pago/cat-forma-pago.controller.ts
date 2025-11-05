import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatFormaPagoService } from './cat-forma-pago.service';
import { CreateCatFormaPagoDto } from './dto/create-cat-forma-pago.dto';
import { UpdateCatFormaPagoDto } from './dto/update-cat-forma-pago.dto';

@Controller('cat-forma-pago')
export class CatFormaPagoController {
  constructor(private readonly catFormaPagoService: CatFormaPagoService) {}

  @Post()
  create(@Body() createCatFormaPagoDto: CreateCatFormaPagoDto) {
    return this.catFormaPagoService.create(createCatFormaPagoDto);
  }

  @Get()
  findAll() {
    return this.catFormaPagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catFormaPagoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatFormaPagoDto: UpdateCatFormaPagoDto) {
    return this.catFormaPagoService.update(+id, updateCatFormaPagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catFormaPagoService.remove(+id);
  }
}
