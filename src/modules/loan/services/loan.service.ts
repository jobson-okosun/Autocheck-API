import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanApplication } from 'src/models/loan/entities/loan.entity';
import { Vehicle } from 'src/models/vehicles/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateLoanApplicationDto } from '../dto/create-loan.dto';
;

@Injectable()
export class LoanApplicationsService {
    constructor(
        @InjectRepository(LoanApplication)
        private readonly loanApplicationRepository: Repository<LoanApplication>,
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
    ) { }

    async createLoanApplication(createLoanApplicationDto: CreateLoanApplicationDto): Promise<LoanApplication> {
        const vehicle = await this.vehicleRepository.findOne({ where: { vin: createLoanApplicationDto.vin } });

        if (!vehicle) {
            throw new NotFoundException('Vehicle not found for the provided VIN.');
        }


        const isEligible = this.checkLoanEligibility(vehicle, createLoanApplicationDto.loanAmount);
        if (!isEligible) {
            throw new BadRequestException('Loan application does not meet eligibility criteria.');
        }

        const loanApplication = this.loanApplicationRepository.create({
            applicantName: createLoanApplicationDto.applicantName,
            applicantEmail: createLoanApplicationDto.applicantEmail,
            loanAmount: createLoanApplicationDto.loanAmount,
            status: 'PENDING',
            vehicle: vehicle,
        });

        return this.loanApplicationRepository.save(loanApplication);
    }

    private checkLoanEligibility(vehicle: Vehicle, loanAmount: number): boolean {
        const minValue = 5000;
        const maxValue = 50000;

        return loanAmount >= minValue && loanAmount <= maxValue;
    }

    async updateLoanStatus(id: string, status: string): Promise<LoanApplication> {
        const loanApplication = await this.loanApplicationRepository.findOne({ where: { id } });

        if (!loanApplication) {
            throw new NotFoundException('Loan application not found.');
        }

        loanApplication.status = status;
        return this.loanApplicationRepository.save(loanApplication);
    }

    async getAllLoans(): Promise<LoanApplication[]> {
        return this.loanApplicationRepository.find({ relations: ['vehicle'] });
    }

    async getLoan(id:string): Promise<LoanApplication> {
        return this.loanApplicationRepository.findOne({ where: { id }});
    }

}
