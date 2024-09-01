import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ValuationSeeder } from "src/database/seeders/valuation.seeder";
import { VehicleSeeder } from "src/database/seeders/vehicle.seeder";
import { Valuation } from "src/models/valuations/entities/valuation.entity";
import { ValuationsController } from "./valuation.controller";
import { ValuationsService } from "./valuation.service";
import { VinLookupService } from "../vehicles/services/vin-lookup.service";
import { HttpModule } from "@nestjs/axios";
import { Vehicle } from "src/models/vehicles/entities/vehicle.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([ Valuation, Vehicle ]),
        HttpModule
    ],
    providers: [
        ValuationSeeder, 
        VehicleSeeder, 
        VinLookupService,
        ValuationsService, 
    ],
    controllers: [ValuationsController],
    exports: [ValuationSeeder]
})
export class ValuationModule {}