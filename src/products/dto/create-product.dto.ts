import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'el nombre no puede ir vacio' })
  @IsString({ message: 'el nombre no es valido' })
  name: string;

  @IsNotEmpty({ message: 'el precio no puede ir vacio' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'el formato del precio no es correcto' },
  )
  precio: number;

  @IsNotEmpty({ message: 'el inventario no puede ir vacio' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'el formarto de numero del inventario no es valido' },
  )
  inventory: number;

  @IsNotEmpty({ message: 'la categoria no puede ir vacia' })
  @IsInt({ message: 'la categoria no es valida' })
  categoryId: number;
}
