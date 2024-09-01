import { ApiResponseOptions, ApiOperationOptions } from '@nestjs/swagger';
import { Valuation } from 'src/models/valuations/entities/valuation.entity';
import { Vehicle } from 'src/models/vehicles/entities/vehicle.entity';
import { LoanApplication } from 'src/models/loan/entities/loan.entity';


export const createValuationDoc: ApiOperationOptions = {
  summary: 'Create a valuation for a vehicle by VIN',
};

export const createValuationResponses: ApiResponseOptions[] = [
  { status: 201, description: 'Valuation successfully created', type: Valuation },
  { status: 404, description: 'Vehicle not found' },
  { status: 500, description: 'Internal server error.' },
];

export const getValuationDoc: ApiOperationOptions = {
  summary: 'Get all valuations for a vehicle by VIN',
};

export const getValuationResponses: ApiResponseOptions[] = [
  { status: 200, description: 'List of valuations for the vehicle', type: [Valuation] },
  { status: 404, description: 'No valuations found for the vehicle' },
  { status: 500, description: 'Internal server error.' },
];


export const createVehicleDoc: ApiOperationOptions = {
  summary: 'Create a new vehicle',
};

export const createVehicleResponses: ApiResponseOptions[] = [
  { status: 201, description: 'Vehicle successfully created', type: Vehicle },
  { status: 400, description: 'Bad request' },
  { status: 500, description: 'Internal server error.' },
];

export const getVehiclesDoc: ApiOperationOptions = {
  summary: 'Get all vehicles',
};

export const getVehiclesResponses: ApiResponseOptions[] = [
  { status: 200, description: 'List of vehicles', type: [Vehicle] },
  { status: 500, description: 'Internal server error.' },
];


export const createLoanDoc: ApiOperationOptions = {
  summary: 'Create a new loan application',
};

export const createLoanResponses: ApiResponseOptions[] = [
  { status: 201, description: 'Loan application successfully created', type: LoanApplication },
  { status: 404, description: 'Vehicle not found' },
  { status: 400, description: 'Bad request' },
  { status: 500, description: 'Internal server error.' },
];

export const updateLoanStatusDoc: ApiOperationOptions = {
  summary: 'Update the status of a loan application',
};

export const updateLoanStatusResponses: ApiResponseOptions[] = [
  { status: 200, description: 'Loan application status updated', type: LoanApplication },
  { status: 404, description: 'Loan application not found' },
  { status: 400, description: 'Bad request' },
  { status: 500, description: 'Internal server error.' },
];
 
export const getAllLoansDoc: ApiOperationOptions = {
  summary: 'Get all loan applications',
};

export const getAllLoansResponses: ApiResponseOptions[] = [
  { status: 200, description: 'List of loan applications', type: [LoanApplication] },
  { status: 500, description: 'Internal server error.' },
];


export const getLoanDoc: ApiOperationOptions = {
  summary: 'Get loan application',
};

export const getLoansResponses: ApiResponseOptions[] = [
  { status: 200, description: 'Loan applications', type: LoanApplication },
  { status: 404, description: 'Loan application not found' },
  { status: 500, description: 'Internal server error.' },
];
