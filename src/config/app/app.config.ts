import { ConfigService } from "@nestjs/config";

export const appConfig = () => {

    const configService = new ConfigService();
    const port = configService.get('PORT') | 3000
    const appName = configService.get('APP_NAME')
    
    const config = { port, appName }
    return config
}
