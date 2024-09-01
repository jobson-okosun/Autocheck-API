import { Vehicle } from "src/models/vehicles/interfaces/vehicle.interface";

export interface Valuation {
    id?: string;
    estimatedValue: number;
    valuationDate: Date;
    vehicle: Vehicle;
}
  