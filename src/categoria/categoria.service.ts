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
    //validar que no exista una categoria con el mismo nombre
    //ingresar jwt
    
    try {

      const alta = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(alta);

      if (!alta) {
        return {
          success: false,
          message: 'No se pudo crear la categoría',
          timestamp: new Date().toISOString(),
        };
      }
      
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

  async findAll() {
    try{
      const categorias = await this.categoriaRepository.find();
      return {
        success: true,
        message: 'Categorías obtenidas con éxito',
        data: categorias,
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      return {
        success: false,
        message: 'Error al obtener las categorías',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async findOne(id: number) {

    try{
      const categoria = await this.categoriaRepository.findOne({ where: { categoriaID: id } });
      return {
        success: true,
        message: 'Categoría obtenida con éxito',
        data: categoria,
        timestamp: new Date().toISOString(),
      };  
    } catch (error) {
      console.error('Error al obtener la categoría:', error);
      return {
        success: false,
        message: 'Error al obtener la categoría',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {

    try{
      const categoria = await this.categoriaRepository.findOne({ where: { categoriaID: id } });
      
      if (!categoria) {
        return {
          success: false,
          message: 'Categoría no encontrada',
          timestamp: new Date().toISOString(),
        };
      }
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
      return {
        success: false,
        message: 'Error al actualizar la categoría',
        timestamp: new Date().toISOString(),
      };
    }

    await this.categoriaRepository.update(id, updateCategoriaDto);
    const updatedCategoria = await this.categoriaRepository.findOne({ where: { categoriaID: id } });

    return {
      success: true,
      message: 'Categoría actualizada con éxito',
      data: updatedCategoria,
      timestamp: new Date().toISOString(),
    };
  
  }

  async remove(id: number) {
    try{
      const categoria = await this.categoriaRepository.findOne({ where: { categoriaID: id } });
      if (!categoria) {
        return {
          success: false,
          message: 'Categoría no encontrada',
          timestamp: new Date().toISOString(),
        };
      }

      await this.categoriaRepository.delete(id);
      return {
        success: true,
        message: 'Categoría eliminada con éxito',
        timestamp: new Date().toISOString(),
      };  
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      return {
        success: false,
        message: 'Error al eliminar la categoría',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
