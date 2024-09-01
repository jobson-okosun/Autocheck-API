import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Valuation } from 'src/models/valuations/entities/valuation.entity';
import { ValuationsService } from './valuation.service';
import { VinLookupService } from '../vehicles/services/vin-lookup.service';

describe('ValuationsService', () => {
  let service: ValuationsService;
  let vinLookupService: VinLookupService;

  const mockVinLookupService = () => ({
    createValuation: jest.fn(),
    getAllValuationsByVin: jest.fn(),
    getVehicleValuation: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValuationsService,
        { provide: VinLookupService, useValue: mockVinLookupService() },
      ],
    }).compile();

    service = module.get<ValuationsService>(ValuationsService);
    vinLookupService = module.get<VinLookupService>(VinLookupService);
  });

  describe('createValuation', () => {
    it('should throw NotFoundException if VinLookupService throws NotFoundException', async () => {
      jest.spyOn(vinLookupService, 'createValuation').mockRejectedValue(new NotFoundException('Vehicle not found'));

      await expect(service.createValuation('1234567890')).rejects.toThrow(NotFoundException);
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      jest.spyOn(vinLookupService, 'createValuation').mockRejectedValue(new Error('Some error'));

      await expect(service.createValuation('1234567890')).rejects.toThrow(InternalServerErrorException);
    });

    it('should return a valuation if VinLookupService is successful', async () => {
      const mockValuation = new Valuation();
      jest.spyOn(vinLookupService, 'createValuation').mockResolvedValue(mockValuation);

      const result = await service.createValuation('1234567890');
      expect(result).toEqual(mockValuation);
    });
  });

  describe('getValuations', () => {
    it('should throw NotFoundException if VinLookupService throws NotFoundException', async () => {
      jest.spyOn(vinLookupService, 'getAllValuationsByVin').mockRejectedValue(new NotFoundException('Vehicle not found'));

      await expect(service.getValuations('1234567890')).rejects.toThrow(NotFoundException);
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      jest.spyOn(vinLookupService, 'getAllValuationsByVin').mockRejectedValue(new Error('Some error'));

      await expect(service.getValuations('1234567890')).rejects.toThrow(InternalServerErrorException);
    });

    it('should return an array of valuations if VinLookupService is successful', async () => {
      const mockValuations = [new Valuation()];
      jest.spyOn(vinLookupService, 'getAllValuationsByVin').mockResolvedValue(mockValuations);

      const result = await service.getValuations('1234567890');
      expect(result).toEqual(mockValuations);
    });
  });

  describe('getValuation', () => {
    it('should throw NotFoundException if VinLookupService throws NotFoundException', async () => {
      jest.spyOn(vinLookupService, 'getVehicleValuation').mockRejectedValue(new NotFoundException('Vehicle not found'));

      await expect(service.getValuation('1234567890')).rejects.toThrow(NotFoundException);
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      jest.spyOn(vinLookupService, 'getVehicleValuation').mockRejectedValue(new Error('Some error'));

      await expect(service.getValuation('1234567890')).rejects.toThrow(InternalServerErrorException);
    });

    it('should return a valuation if VinLookupService is successful', async () => {
      const mockValuation = new Valuation();
      jest.spyOn(vinLookupService, 'getVehicleValuation').mockResolvedValue(mockValuation);

      const result = await service.getValuation('1234567890');
      expect(result).toEqual(mockValuation);
    });
  });
});
