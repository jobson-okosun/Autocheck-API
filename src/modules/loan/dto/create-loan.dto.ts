import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsNumber, Min, Max } from 'class-validator';
import { LoanDtoConstants } from 'src/common/constants/swagger.constant';

export class CreateLoanApplicationDto {

  @ApiProperty(LoanDtoConstants.APPLICANT_NAME)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  applicantName: string;

  @ApiProperty(LoanDtoConstants.APPLICANT_EMAIL)
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toLowerCase())
  applicantEmail: string;

  @ApiProperty(LoanDtoConstants.LOAN_AMOUNT)
  @IsNumber()
  @Min(1000)
  @Max(50000)
  loanAmount: number;

  @ApiProperty(LoanDtoConstants.VIN)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  vin: string;

}
