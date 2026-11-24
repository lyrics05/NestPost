import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    database: configService.get('DATABASE_NAME'),
    password: configService.get('DATABASE_PASS'),
    ssl: true,
    entities: [join(__dirname + '../../**/*.entity.{js, ts}')],
    synchronize: true,
  };
};
