import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    console.log('ESTO ES EL ID', createProductDto.categoryId);
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    console.log('ESTO ES LA CATEGORIA ENCONTRADA', category);

    if (!category) {
      const errors: string[] = [];
      errors.push('la categoria no existe');
      throw new NotFoundException(errors);
    }
    return this.productRepository.save({
      ...createProductDto,
      category,
    });
  }

  async findAll(category_id: number | null, take: number, skip: number) {
    const options: FindManyOptions<Product> = {
      relations: {
        category: true,
      },
      order: {
        id: 'DESC',
      },
      take,
      skip,
    };

    if (category_id) {
      options.where = {
        category: {
          id: category_id,
        },
      };
    }

    const [products, total] =
      await this.productRepository.findAndCount(options);

    return {
      products,
      total,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: { category: true },
    });
    if (!product) {
      throw new NotFoundException(
        `el producto con el id ${id} no fue encontrado`,
      );
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateProductDto.categoryId },
      });
      if (!category) {
        const errors: string[] = [];
        errors.push('no se encontro la categoria');
        throw new NotFoundException(errors);
      }

      product.category = category;
    }
    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return 'El elemento fue eliminado correctamente';
  }
}
