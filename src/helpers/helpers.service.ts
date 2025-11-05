import { Injectable } from '@nestjs/common';
import { CreateHelperDto } from './dto/create-helper.dto';
import { UpdateHelperDto } from './dto/update-helper.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HelpersService {
  create(createHelperDto: CreateHelperDto) {
    return 'This action adds a new helper';
  }

  findAll() {
    return `This action returns all helpers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} helper`;
  }

  update(id: number, updateHelperDto: UpdateHelperDto) {
    return `This action updates a #${id} helper`;
  }

  remove(id: number) {
    return `This action removes a #${id} helper`;
  }

  public generateUUID(): string {
      return uuidv4();
  }

  
}
