import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Raketista')
    .setDescription('API Docu for backend')
    .setVersion('1.0')
    // tags for sections
    .addTag('raket', 'Endpoints related to RaketNow features')
    .addTag('auth', 'Authentication and login APIs')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// run the server then go to http://localhost:3000/api