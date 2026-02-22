import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SecurityExceptionFilter } from './security/security.exception-filter';
import { SecurityService } from './security/security.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Use Helmet for security headers
    app.use(helmet());

    // Enable global validation pipes for DTOs
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    // Global Security Exception Filter
    const securityService = app.get(SecurityService);
    app.useGlobalFilters(new SecurityExceptionFilter(securityService));

    // Enable CORS for frontend
    app.enableCors({
        origin: true, // In production, replace with specific allowed origins
        credentials: true,
    });

    await app.listen(process.env.PORT ?? 3001);
    console.log(`Backend is running on: ${await app.getUrl()}`);
}
bootstrap();
