import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { appConfig } from './config/app/app.config';
import { AllExceptionsFilter } from './common/exceptions/filters/all-exceptions.filter';
import { setupSwagger } from './config/documentation/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = appConfig();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter())
  setupSwagger(app);
  await app.listen(3000).then(() => Logger.log(`App is running on port ${ port }`))
}
bootstrap();
