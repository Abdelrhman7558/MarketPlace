import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SecurityService } from './security.service';

@Injectable()
export class SecurityInterceptor implements NestInterceptor {
    private readonly logger = new Logger('SecurityInterceptor');

    constructor(private securityService: SecurityService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url, ip, headers, body } = request;
        const user = request.user;

        // 1. Detect suspiciously large payloads
        const contentLength = parseInt(headers['content-length'] || '0');
        if (contentLength > 1000000) { // 1MB threshold
            this.securityService.logEvent({
                level: 'WARN',
                eventType: 'LARGE_PAYLOAD',
                description: `Suspiciously large payload detected: ${contentLength} bytes`,
                ip,
                userId: user?.userId,
                path: url,
                method,
                metadata: { contentLength },
            });
        }

        // 2. Detect basic XSS/SQLi in body/query (simple heuristic)
        const dangerousPatterns = [
            /<script\b[^>]*>([\s\S]*?)<\/script>/gim,
            /UNION\s+SELECT/gi,
            /OR\s+1=1/gi,
            /DROP\s+TABLE/gi,
        ];

        const bodyStr = JSON.stringify(body || {});
        const queryStr = JSON.stringify(request.query || {});

        for (const pattern of dangerousPatterns) {
            if (pattern.test(bodyStr) || pattern.test(queryStr)) {
                this.securityService.logEvent({
                    level: 'CRITICAL',
                    eventType: 'INJECTION_ATTEMPT',
                    description: `Dangerous pattern detected in request: ${pattern.source}`,
                    ip,
                    userId: user?.userId,
                    path: url,
                    method,
                    payload: body,
                });
                // In a real scenario, we could block the request here, but for now we just log
            }
        }

        return next.handle().pipe(
            tap({
                error: (err) => {
                    // Errors are handled by the SecurityExceptionFilter
                },
            }),
        );
    }
}
