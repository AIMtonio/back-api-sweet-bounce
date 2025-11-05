import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    
    try {
      // Lógica para crear una nueva categoría
      // Por ejemplo, guardar en la base de datos

      const alta = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(alta);
      //this.categoriaRepository.save(alta);
      console.log('Categoría creada:', alta);

      
      return {
        success: true,
        message: 'Categoría creada con éxito',
        data: createCategoriaDto, // Aquí deberías retornar la categoría creada desde la base de datos
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      return {
        success: false,
        message: 'Error al crear la categoría',
        timestamp: new Date().toISOString(),
      };
    }

  }

  findAll() {
    return `This action returns all categoria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
