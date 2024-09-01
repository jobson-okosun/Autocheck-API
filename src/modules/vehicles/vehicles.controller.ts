import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { VehiclesService } from "./services/vehicles.service";
import { Vehicle } from "src/models/vehicles/entities/vehicle.entity";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { createVehicleDoc, createVehicleResponses, getVehiclesDoc, getVehiclesResponses } from "src/common/constants/swagger.docs.constant";

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @ApiOperation(getVehiclesDoc)
  @ApiResponse(getVehiclesResponses[0])
  @ApiResponse(getVehiclesResponses[1])
  async getVehicles() {
    return await this.vehiclesService.getVehicles();
  }
 
  @Post()
  @ApiOperation(createVehicleDoc)
  @ApiResponse(createVehicleResponses[0])
  @ApiResponse(createVehicleResponses[1])
  @ApiResponse(createVehicleResponses[2])
  async create(@Body(new ValidationPipe()) createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return await this.vehiclesService.create(createVehicleDto);
  }
}