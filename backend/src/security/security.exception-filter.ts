import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SecurityService } from './security.service';

@Catch()
export class SecurityExceptionFilter implements ExceptionFilter {
    constructor(private securityService: SecurityService) { }

    async catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const ip = request.ip;
        const user = (request as any).user;
        const url = request.url;
        const method = request.method;

        // Detect Security Anomalies based on HTTP Status
        if (status === HttpStatus.UNAUTHORIZED || status === HttpStatus.FORBIDDEN) {
            await this.securityService.logEvent({
                level: 'WARN',
                eventType: status === HttpStatus.UNAUTHORIZED ? 'UNAUTHORIZED_ACCESS' : 'FORBIDDEN_ACCESS',
                description: `Failed access attempt to ${url}`,
                ip,
                userId: user?.userId,
                path: url,
                method,
            });
        }

        if (status === HttpStatus.TOO_MANY_REQUESTS) {
            await this.securityService.logEvent({
                level: 'WARN',
                eventType: 'RATE_LIMIT_EXCEEDED',
                description: `Rate limit hit by IP: ${ip}`,
                ip,
                path: url,
                method,
            });
        }

        if (status === HttpStatus.NOT_FOUND) {
            // Could be endpoint scanning
            await this.securityService.logEvent({
                level: 'INFO',
                eventType: 'NOT_FOUND_SCAN',
                description: `404 encountered for ${url}`,
                ip,
                path: url,
                method,
            });
        }

        // Default Nest behavior for the response
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: (exception as any).message || 'Internal server error',
        });
    }
}
