import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { getProductDto } from './dto/get-product.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: getProductDto) {
    const category = query.category_id ? query.category_id : null;
    const take = query.take ? query.take : 10;
    const skip = query.skip ? query.skip : 0;
    console.log(category);
    return this.productsService.findAll(category, take, skip);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    console.log(
      'ESTO ES UPDATE PRODUCT DTO EN EL CONTROLADOR Y AL PRICIPIO',
      updateProductDto,
    );
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.remove(+id);
  }
}
