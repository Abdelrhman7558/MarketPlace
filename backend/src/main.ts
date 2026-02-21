import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable global validation pipes for DTOs
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    // Enable CORS for frontend
    app.enableCors();

    await app.listen(process.env.PORT ?? 3001);
    console.log(`Backend is running on: ${await app.getUrl()}`);
}
bootstrap();
