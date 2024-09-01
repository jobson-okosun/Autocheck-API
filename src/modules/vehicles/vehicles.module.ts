import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleSeeder } from '../../database/seeders/vehicle.seeder';
import { Vehicle } from '../../models/vehicles/entities/vehicle.entity';
import { Valuation } from '../../models/valuations/entities/valuation.entity';
import { LoanApplication } from '../../models/loan/entities/loan.entity';
import { ValuationSeeder } from '../../database/seeders/valuation.seeder';
import { LoanApplicationSeeder } from '../../database/seeders/loan.seeder';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './services/vehicles.service';
import { VinLookupService } from './services/vin-lookup.service';
import { HttpModule } from '@nestjs/axios';


@Module({
    imports: [
        TypeOrmModule.forFeature([ Vehicle, Valuation, LoanApplication ]),
        HttpModule
    ], 
    providers: [
        VehicleSeeder,  
        ValuationSeeder,
        LoanApplicationSeeder, 
        VehiclesService,
        VinLookupService,
    ],
    controllers: [VehiclesController],
    exports: [VehicleSeeder, VinLookupService]
})
export class VehiclesModule {}
