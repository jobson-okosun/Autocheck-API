import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoanApplicationSeeder } from "src/database/seeders/loan.seeder";
import { VehicleSeeder } from "src/database/seeders/vehicle.seeder";
import { LoanApplication } from "src/models/loan/entities/loan.entity";
import { Vehicle } from "src/models/vehicles/entities/vehicle.entity";
import { LoanApplicationsController } from "./loan.controller";
import { LoanApplicationsService } from "./services/loan.service";

@Module({
    imports: [TypeOrmModule.forFeature([ LoanApplication, Vehicle ])],
    providers: [LoanApplicationSeeder, VehicleSeeder, LoanApplicationsService],
    controllers: [LoanApplicationsController],
    exports: [LoanApplicationSeeder]
})

export class LoanApplicationModule { }