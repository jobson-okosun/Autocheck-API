import { Vehicle } from "src/models/vehicles/entities/vehicle.entity";

export interface LoanApplication {
    id?: string;
    applicantName: string;
    applicantEmail: string;
    loanAmount: number;
    status: string;
    vehicle: Vehicle;
  }