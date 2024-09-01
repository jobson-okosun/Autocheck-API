import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db/config.development';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { ValuationModule } from './modules/valuation/valuation.module';
import { LoanApplicationModule } from './modules/loan/loan.module';
import { SeederService } from './seed';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestInterceptor } from './common/interceptors/request.interceptor';

@Module({ 
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
       imports: [ConfigModule],
       useFactory: dbConfig,
       inject: [ConfigService],
    }),
    VehiclesModule,
    ValuationModule,
    LoanApplicationModule,
    HttpModule
  ], 
  controllers: [],
  providers: [
    SeederService,
    HttpRequestInterceptor
  ]
})

export class AppModule {
  constructor(private readonly seederService: SeederService) { 
    this.seed();
  }

  async seed() {
    await this.seederService.seed();
  }
}
