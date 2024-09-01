
import { Injectable } from '@nestjs/common';
import { VehicleSeeder } from './database/seeders/vehicle.seeder';
import { ValuationSeeder } from './database/seeders/valuation.seeder';
import { LoanApplicationSeeder } from './database/seeders/loan.seeder';


@Injectable()
export class SeederService {
    
  constructor(
    private readonly vehicleSeeder: VehicleSeeder,
    private readonly valuationSeeder: ValuationSeeder,
    private readonly loanApplicationSeeder: LoanApplicationSeeder,
  ) {}


  async seed() {
    await this.vehicleSeeder.seed();
    await this.valuationSeeder.seed();
    await this.loanApplicationSeeder.seed();
  }
}
