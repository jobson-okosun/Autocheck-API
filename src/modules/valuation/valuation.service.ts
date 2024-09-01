import { Injectable, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { VinLookupService } from '../vehicles/services/vin-lookup.service';
import { Valuation } from 'src/models/valuations/entities/valuation.entity';


@Injectable()
export class ValuationsService {

  constructor(
    private readonly vinLookupService: VinLookupService,
  ) { }
  
  async createValuation(@Param('vin') vin: string): Promise<Valuation> {
    try {
      return await this.vinLookupService.createValuation(vin);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while creating the valuation.');
    }
  }

  async getValuations(vin: string): Promise<Valuation[]>  {
    try {
      return await this.vinLookupService.getAllValuationsByVin(vin);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while retrieving the vehicle valuations.');
    }
  }

  async getValuation(vin: string): Promise<Valuation>  {
    try {
      return await this.vinLookupService.getVehicleValuation(vin);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while retrieving the vehicle valuation.');
    }
  }
}
