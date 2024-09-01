import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Vehicle } from "src/models/vehicles/entities/vehicle.entity";
import { Repository } from "typeorm";
import { VinLookupService } from "./vin-lookup.service";
import { CreateVehicleDto } from "../dto/create-vehicle.dto";

@Injectable()
export class VehiclesService {

  constructor(
    @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
    private readonly vinLookupService: VinLookupService,
  ) { }

  getVehicles(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {

    const existingVehicle = await this.vehicleRepository.findOne({ where: { vin: createVehicleDto.vin } });
    if (existingVehicle) {
      throw new BadRequestException('A vehicle with this VIN already exists.');
    }

    let vinDetails: any;

    try {
      vinDetails = await this.vinLookupService.getVehicleDetails(createVehicleDto.vin);
    } catch (error) {
      throw new BadRequestException('Failed to fetch vehicle details from VIN lookup API.');
    }

    if (!vinDetails || !vinDetails.make || !vinDetails.model) {
      throw new BadRequestException('The VIN provided does not return valid vehicle details.');
    }

    const vehicle = this.vehicleRepository.create({
      vin: createVehicleDto.vin,
      make: vinDetails.make,
      model: vinDetails.model,
      year: vinDetails.year,
      mileage: createVehicleDto.mileage,
    });

    try {
      return await this.vehicleRepository.save(vehicle);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while saving the vehicle to the database.');
    }
  }

}