import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Autochek API')
    .setDescription('The Autochek API documentation')
    .setVersion('1.0')
    .addTag('Vehicles')
    .addTag('Loan')
    .addTag('Valuations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
