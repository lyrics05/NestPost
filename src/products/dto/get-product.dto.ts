import { IsNumberString, IsOptional } from 'class-validator';

export class getProductDto {
  @IsOptional()
  @IsNumberString({}, { message: 'la categoria debe ser un numero' })
  category_id?: number;

  @IsOptional()
  @IsNumberString({}, { message: 'la cantidad debe ser un numero' })
  take: number;

  @IsOptional()
  @IsNumberString({}, { message: 'la cantidad deve ser un numero' })
  skip: number;
}
