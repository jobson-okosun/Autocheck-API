import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from 'src/models/vehicles/entities/vehicle.entity';
import { VinLookupService } from './vin-lookup.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let vinLookupService: VinLookupService;
  let vehicleRepository: Repository<Vehicle>;

  const mockVehicleRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  });

  const mockVinLookupService = () => ({
    getVehicleDetails: jest.fn(),
  });

  const mockHttpService = {
    get: jest.fn(() => of({ data: {} })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        VinLookupService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: mockVehicleRepository(),
        },
        {
          provide: VinLookupService,
          useValue: mockVinLookupService(),
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    vinLookupService = module.get<VinLookupService>(VinLookupService);
    vehicleRepository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw an error if a vehicle with the same VIN already exists', async () => {
      const createVehicleDto: CreateVehicleDto = {
        vin: '12345',
        mileage: 1000,
      };
      jest.spyOn(vehicleRepository, 'findOne').mockResolvedValueOnce({} as Vehicle);

      await expect(service.create(createVehicleDto)).rejects.toThrowError();
    });

    it('should save a new vehicle if VIN does not exist', async () => {
      const createVehicleDto: CreateVehicleDto = {
        vin: '12345',
        mileage: 1000,
      };
      jest.spyOn(vehicleRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(vehicleRepository, 'save').mockResolvedValueOnce({} as Vehicle);
      jest.spyOn(vinLookupService, 'getVehicleDetails').mockResolvedValueOnce({
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
      });

      await expect(service.create(createVehicleDto)).resolves.toBeDefined();
    });
  });
});
