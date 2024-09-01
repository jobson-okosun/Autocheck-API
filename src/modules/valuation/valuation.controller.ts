import { Controller, Get, Param, Post } from '@nestjs/common';
import { ValuationsService } from './valuation.service';
import { Valuation } from 'src/models/valuations/entities/valuation.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createValuationDoc, createValuationResponses, getValuationDoc, getValuationResponses } from 'src/common/constants/swagger.docs.constant';

@ApiTags('Valuations')
@Controller('valuations')
export class ValuationsController {
  constructor(private readonly valuationsService: ValuationsService) {}

  @Post(':vin') 
  @ApiOperation(createValuationDoc)
  @ApiResponse(createValuationResponses[0])
  @ApiResponse(createValuationResponses[1])
  @ApiResponse(createValuationResponses[2])
  async createValuation(@Param('vin') vin: string): Promise<Valuation> {
    return this.valuationsService.createValuation(vin);
  }

  @Get(':vin')
  @ApiOperation(getValuationDoc)
  @ApiResponse(getValuationResponses[0])
  @ApiResponse(getValuationResponses[1])
  @ApiResponse(getValuationResponses[2])
  @Get(':vin')
  async getValuation(@Param('vin') vin: string): Promise<Valuation[]> {
    return this.valuationsService.getValuations(vin);
  }
}
