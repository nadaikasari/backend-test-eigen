import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger
  const config = new DocumentBuilder()
  .setTitle('API Example')
  .setDescription('Deskripsi API Anda')
  .setVersion('1.0')
  .addTag('Backend Test Eigen')  // Jika ingin menambahkan tag khusus
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // Swagger UI akan diakses di /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
