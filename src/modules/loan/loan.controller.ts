import { Controller, Post, Body, Put, Param, BadRequestException, InternalServerErrorException, NotFoundException, ValidationPipe, Patch, Get } from '@nestjs/common';
import { LoanApplicationsService } from './services/loan.service';
import { CreateLoanApplicationDto } from './dto/create-loan.dto';
import { LoanApplication } from 'src/models/loan/entities/loan.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createLoanDoc, createLoanResponses, getAllLoansDoc, getAllLoansResponses, getLoanDoc, getLoansResponses, updateLoanStatusDoc, updateLoanStatusResponses } from 'src/common/constants/swagger.docs.constant';
import { UpdateLoanAppplicationStatus } from './dto/update-loan.dto';


@ApiTags('Loan')
@Controller('loan')
export class LoanApplicationsController {
    constructor(private readonly loanApplicationsService: LoanApplicationsService) { }

    @Get()
    @ApiOperation(getAllLoansDoc)
    @ApiResponse(getAllLoansResponses[0])
    @ApiResponse(getAllLoansResponses[1])
    async getAllLoans(): Promise<LoanApplication[]> {
        return await this.loanApplicationsService.getAllLoans();
    }

    @Post()
    @ApiOperation(createLoanDoc)
    @ApiResponse(createLoanResponses[0])
    @ApiResponse(createLoanResponses[1])
    @ApiResponse(createLoanResponses[2])
    @ApiResponse(createLoanResponses[3])
    async create(@Body() createLoanApplicationDto: CreateLoanApplicationDto): Promise<LoanApplication> {
        return await this.loanApplicationsService.createLoanApplication(createLoanApplicationDto);
    }

    @Get(':id')
    @ApiOperation(getLoanDoc)
    @ApiResponse(getLoansResponses[0])
    @ApiResponse(getLoansResponses[1])
    @ApiResponse(getLoansResponses[2])
    async getLoan(@Param('id') id: string): Promise<LoanApplication> {
        return await this.loanApplicationsService.getLoan(id);
    }

    @ApiOperation(updateLoanStatusDoc)
    @ApiResponse(updateLoanStatusResponses[0])
    @ApiResponse(updateLoanStatusResponses[1])
    @ApiResponse(updateLoanStatusResponses[2])
    @ApiResponse(updateLoanStatusResponses[3])
    @Patch('status/:id')
    async updateStatus(@Param('id') id: string, @Body() updateLoanStatusDto: UpdateLoanAppplicationStatus): Promise<LoanApplication> {
        return await this.loanApplicationsService.updateLoanStatus(id, updateLoanStatusDto.status);
    }
}
