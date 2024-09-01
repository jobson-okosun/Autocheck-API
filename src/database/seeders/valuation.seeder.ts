import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Valuation  } from '../../models/valuations/entities/valuation.entity';
import { Vehicle } from '../../models/vehicles/entities/vehicle.entity';


@Injectable()
export class ValuationSeeder {
  constructor(
    @InjectRepository(Valuation) private readonly valuationRepository: Repository<Valuation>,
    @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,

  ) {}

  async seed() {
    const vehicles = await this.vehicleRepository.find();

    const valuations = vehicles.map(vehicle => ({ 
      estimatedValue: Math.floor(Math.random() * 20000) + 10000,
      valuationDate: new Date(),
      vehicle: vehicle,
    }));

    await this.valuationRepository.save(valuations);
    Logger.log(`Seeded ${valuations.length} valuations`);
  }
}
