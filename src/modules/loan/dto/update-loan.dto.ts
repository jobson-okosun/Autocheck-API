import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { LoanDtoConstants } from 'src/common/constants/swagger.constant';

export class UpdateLoanAppplicationStatus {

  @ApiProperty(LoanDtoConstants.STATUS)
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsEnum([ 'PENDING', 'APPROVED', 'REJECTED'])
  status: string;

}
