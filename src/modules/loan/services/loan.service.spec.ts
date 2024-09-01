import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { LoanApplication } from 'src/models/loan/entities/loan.entity';
import { Vehicle } from 'src/models/vehicles/entities/vehicle.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateLoanApplicationDto } from '../dto/create-loan.dto';
import { LoanApplicationsService } from './loan.service';

describe('LoanApplicationsService', () => {
  let service: LoanApplicationsService;
  let loanRepository: Repository<LoanApplication>;
  let vehicleRepository: Repository<Vehicle>;

  const mockLoanRepository = () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  });

  const mockVehicleRepository = () => ({
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanApplicationsService,
        { provide: getRepositoryToken(LoanApplication), useValue: mockLoanRepository() },
        { provide: getRepositoryToken(Vehicle), useValue: mockVehicleRepository() },
      ],
    }).compile();

    service = module.get<LoanApplicationsService>(LoanApplicationsService);
    loanRepository = module.get<Repository<LoanApplication>>(getRepositoryToken(LoanApplication));
    vehicleRepository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
  });

  describe('createLoanApplication', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should throw NotFoundException if vehicle does not exist', async () => {
      const dto: CreateLoanApplicationDto = {
        applicantName: 'John Doe',
        applicantEmail: 'john@example.com',
        loanAmount: 10000,
        vin: '1234567890',
      };

      jest.spyOn(vehicleRepository, 'findOne').mockResolvedValue(null);

      await expect(service.createLoanApplication(dto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if loan amount is not eligible', async () => {
      const dto: CreateLoanApplicationDto = {
        applicantName: 'John Doe',
        applicantEmail: 'john@example.com',
        loanAmount: 60000,
        vin: '1234567890',
      };

      const mockVehicle = new Vehicle();
      mockVehicle.vin = '1234567890';

      jest.spyOn(vehicleRepository, 'findOne').mockResolvedValue(mockVehicle);

      await expect(service.createLoanApplication(dto)).rejects.toThrow(BadRequestException);
    });

    it('should create and save a loan application', async () => {
      const dto: CreateLoanApplicationDto = {
        applicantName: 'John Doe',
        applicantEmail: 'john@example.com',
        loanAmount: 10000,
        vin: '1234567890',
      };

      const mockVehicle = new Vehicle();
      mockVehicle.vin = '1234567890';

      jest.spyOn(vehicleRepository, 'findOne').mockResolvedValue(mockVehicle);
      jest.spyOn(loanRepository, 'create').mockReturnValue({
        ...dto,
        status: 'PENDING',
        vehicle: mockVehicle,
      } as any);
      jest.spyOn(loanRepository, 'save').mockResolvedValue({
        ...dto,
        status: 'PENDING',
        vehicle: mockVehicle,
      } as any);

      const result = await service.createLoanApplication(dto);
      expect(result).toEqual({ ...dto, status: 'PENDING', vehicle: mockVehicle });
    });
  });

  describe('updateLoanStatus', () => {
    it('should throw NotFoundException if loan application does not exist', async () => {
      jest.spyOn(loanRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateLoanStatus('nonexistent-id', 'APPROVED')).rejects.toThrow(NotFoundException);
    });

    it('should update and save the loan application status', async () => {
      const mockLoanApplication = new LoanApplication();
      mockLoanApplication.id = 'existing-id';
      mockLoanApplication.status = 'PENDING';

      jest.spyOn(loanRepository, 'findOne').mockResolvedValue(mockLoanApplication);
      jest.spyOn(loanRepository, 'save').mockResolvedValue({ ...mockLoanApplication, status: 'APPROVED' });

      const result = await service.updateLoanStatus('existing-id', 'APPROVED');
      expect(result.status).toEqual('APPROVED');
    });
  });

  describe('getAllLoans', () => {
    it('should return an array of loan applications with vehicles', async () => {
      const mockLoanApplications = [new LoanApplication()];

      jest.spyOn(loanRepository, 'find').mockResolvedValue(mockLoanApplications);

      const result = await service.getAllLoans();
      expect(result).toEqual(mockLoanApplications);
    });
  });
});
