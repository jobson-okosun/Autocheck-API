import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoanApplication } from "../../models/loan/entities/loan.entity";
import { Vehicle } from "../../models/vehicles/entities/vehicle.entity";
import { Repository } from "typeorm";

@Injectable()
export class LoanApplicationSeeder {
    
  constructor(
    @InjectRepository(LoanApplication) private readonly loanApplicationRepository: Repository<LoanApplication>, 
    @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
  ) { }

  async seed() {
    const vehicles = await this.vehicleRepository.find();

    const loanApplications = vehicles.map(vehicle => ({
      applicantName: 'John Doe',
      applicantEmail: 'johndoe@example.com',
      loanAmount: Math.floor(Math.random() * 50000) + 10000,
      status: 'PENDING',
      vehicle: vehicle,
    }));

    await this.loanApplicationRepository.save(loanApplications);
    Logger.log(`Seeded ${loanApplications.length} loan applications`);
  }
}