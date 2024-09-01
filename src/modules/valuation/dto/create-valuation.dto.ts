import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, Min } from 'class-validator';
import { ValuationDtoConstants } from 'src/common/constants/swagger.constant';

export class CreateValuationDto {
  @ApiProperty(ValuationDtoConstants.ESTIMATED_VALUE)
  @IsNumber()
  @Min(0)
  estimatedValue: number;

  @ApiProperty(ValuationDtoConstants.VALUATION_DATE)
  @IsString()
  @IsNotEmpty()
  valuationDate: string; 
}
