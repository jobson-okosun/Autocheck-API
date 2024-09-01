export const VehicleDtoConstants = {
    VIN: {
      example: '5FRYD4H66GB592800',
      description: 'The VIN of the vehicle',
      minLength: 17,
      maxLength: 17,
    },
    MILEAGE: {
      example: 120000,
      description: 'The mileage of the vehicle in miles',
      minimum: 0,
    },
  };
  
  export const LoanDtoConstants = {
    APPLICANT_NAME: {
      example: 'John Doe',
      description: 'The applicant\'s full name',
    },
    APPLICANT_EMAIL: {
      example: 'john.doe@example.com',
      description: 'The applicant\'s email address',
    },
    LOAN_AMOUNT: {
      example: 10000,
      description: 'The amount of loan requested',
      minimum: 1000,
    },
    VIN: { 
      example: '5FRYD4H66GB592800', 
      description: 'The vehicle identification number' 
    },
    STATUS: {
      example: 'APPROVED',
      description: 'New load status | [ PENDING, APPROVED, REJECTED]'
    }
  };
  
  export const ValuationDtoConstants = {
    ESTIMATED_VALUE: {
      example: 15000,
      description: 'The estimated value of the vehicle',
    },
    VALUATION_DATE: {
      example: '2024-09-01',
      description: 'The date of the valuation',
    },
  };
  