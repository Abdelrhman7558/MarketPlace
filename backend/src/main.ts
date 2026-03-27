import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SecurityExceptionFilter } from './security/security.exception-filter';
import { SecurityService } from './security/security.service';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Serve uploaded KYC files as static assets
    app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });

    // Increase JSON body limit to 50mb for base64 image uploads
    app.use(require('express').json({ limit: '50mb' }));
    app.use(require('express').urlencoded({ limit: '50mb', extended: true }));

    // Use Helmet for strict security headers
    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
        frameguard: { action: 'deny' },
    }));

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
        origin: true,
        credentials: true,
    });

    // Enable Socket.io adapter
    app.useWebSocketAdapter(new IoAdapter(app));

    await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
    console.log(`Backend is running on: ${await app.getUrl()}`);
}
bootstrap();
