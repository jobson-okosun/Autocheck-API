import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Vehicle as VehicleEntity } from "../../models/vehicles/entities/vehicle.entity";
import { Vehicle } from "../..//models/vehicles/interfaces/vehicle.interface";
import { Repository } from "typeorm";

@Injectable()
export class VehicleSeeder {
  constructor(@InjectRepository(VehicleEntity) private readonly vehicleRepository: Repository<VehicleEntity>) {}

  async seed() {

    const vehicles: Vehicle[] = [
        { vin: '1HGCM82633A123456', make: 'Honda', model: 'Accord', year: 2020, mileage: 15000 },
        { vin: '1HGCM82633A654321', make: 'Toyota', model: 'Camry', year: 2019, mileage: 20000 },
      ];

    const savedVehicles = await this.vehicleRepository.save(vehicles);
    Logger.log(`Seeded ${savedVehicles.length} vehicles`);

  }
}