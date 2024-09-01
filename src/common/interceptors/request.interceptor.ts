import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpRequestInterceptor implements OnModuleInit {
  
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use(
      (config: any) => {
        
        if (config.url.includes(this.configService.get('RAPIDAPI_HOST'))) {
          config.headers['x-rapidapi-key'] = this.configService.get('RAPIDAPI_KEY');
          config.headers['x-rapidapi-host'] = this.configService.get('RAPIDAPI_HOST');
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
}
