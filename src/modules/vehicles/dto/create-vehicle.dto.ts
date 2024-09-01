import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, Length } from 'class-validator';
import { VehicleDtoConstants } from 'src/common/constants/swagger.constant';

export class CreateVehicleDto {
  @ApiProperty(VehicleDtoConstants.VIN)
  @IsString()
  @IsNotEmpty()
  @Length(17, 17) 
  vin: string;

  @ApiProperty(VehicleDtoConstants.MILEAGE)
  @IsNumber()
  @Min(0)
  mileage: number;
}
