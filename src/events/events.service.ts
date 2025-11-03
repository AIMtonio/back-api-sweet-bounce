import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {

  constructor(private _prismaService: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    try{
    const eventCrete = await this._prismaService.evento.create({ data: createEventDto });

    if(!eventCrete)
    {
      throw new ConflictException('Error al crear el evento');
    }

    return eventCrete;

    }catch(error)
    {
      if(error instanceof Prisma.PrismaClientKnownRequestError)
      {
        if(error.code === 'P2002')
        {
          throw new ConflictException(`Product with SKU ${createEventDto.name} already exists`);
        }
      }
    }
  }

  findAll() {
    return this._prismaService.evento.findMany();
  }

  async findOne(id: number) {
    const eventFound = await this._prismaService.evento.findUnique({ where: { id } });

    if(!eventFound)
    {
      throw new ConflictException(`El evento con id ${id} no existe`);
    }

    return eventFound;

  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const eventFound = await this._prismaService.evento.findUnique({ where: { id } });

    if(!eventFound)
    {
      throw new ConflictException(`El evento con id ${id} no existe`);
    }

    const eventUpdate = await this._prismaService.evento.update({ where: { id }, data: updateEventDto });

    return eventUpdate;
  }

  async remove(id: number) {
    const eventFound = await this._prismaService.evento.findUnique({ where: { id } });

    if(!eventFound)
    {
      throw new ConflictException(`El evento con id ${id} no existe`);
    }

    return this._prismaService.evento.delete({ where: { id } });

  }
}
