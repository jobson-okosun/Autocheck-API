import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const dbConfig = (): TypeOrmModuleOptions => {

  const configService = new ConfigService();
  const type = configService.get<string>('DATABASE_TYPE') as 'sqlite' | 'mysql' | 'postgres';
  const database = configService.get<string>('DATABASE');
  
  const config = {
    type, 
    database,
    autoLoadEntities: true,
    // entities: ['../../../models/**/*.entity{.ts,.js}'],
    synchronize: true,
  };

  return config;

};
