import { ConfigService } from "@nestjs/config";

export const createVinLookupOptions = (vin: string) => {
    const config = new ConfigService()
    return {
        method: 'GET',
        url: `${ config.get('RAPIDAPI_BASE_URL') }/vehicle-lookup`,
        params: { vin }
    }; 
};
