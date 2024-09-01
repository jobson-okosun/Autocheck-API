import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { createVinLookupOptions } from 'src/config/api/payload.config';
import { Valuation } from 'src/models/valuations/entities/valuation.entity';
import { Vehicle } from 'src/models/vehicles/entities/vehicle.entity';
import { Repository } from 'typeorm';
 
@Injectable()
export class VinLookupService { 
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Valuation) private readonly valuationRepository: Repository<Valuation>,
  ) {}

  async getVehicleDetails(vin: string): Promise<any> {
    const options = createVinLookupOptions(vin)

    try {
      const response = await firstValueFrom(this.httpService.get(options.url, { params: options.params }))
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching vehicle details from VIN lookup API.');
    }
  }

  async createValuation(vin: string): Promise<Valuation> {
    const vehicle = await this.vehicleRepository.findOne({ where: { vin } });
    
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found for the provided VIN.');
    }

    const vehicleDetails = await this.getVehicleDetails(vin);

    const valuation = new Valuation();
    valuation.estimatedValue = vehicleDetails.retail_value || Math.floor(Math.random() * 20000) + 5000;
    valuation.valuationDate = new Date();
    valuation.vehicle = vehicle;

    return this.valuationRepository.save(valuation);
  }

  async getVehicleValuation(vin: string): Promise<Valuation> {
    const vehicle = await this.vehicleRepository.findOne({ where: { vin }, relations: ['valuations'] });

    if (!vehicle || !vehicle.valuations || vehicle.valuations.length === 0) {
      throw new NotFoundException('No valuation found for the provided VIN.');
    }
    return vehicle.valuations[vehicle.valuations.length - 1]; 
  }

  async getAllValuationsByVin(vin: string): Promise<Valuation[]> {
    const vehicle = await this.vehicleRepository.findOne({ where: { vin }, relations: ['valuations'] });

    if (!vehicle || !vehicle.valuations || vehicle.valuations.length === 0) {
      throw new NotFoundException('No valuations found for the provided VIN.');
    }
    return vehicle.valuations;
  }

}
