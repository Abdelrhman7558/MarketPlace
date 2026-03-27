import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user } = request;

    // Only log write operations for the audit trail
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      return next.handle().pipe(
        tap(async (data) => {
          try {
            // We only care about admin actions for the AdminActionLog
            if (user && user.role === 'ADMIN') {
              await this.prisma.adminActionLog.create({
                data: {
                  adminId: user.sub,
                  action: `${method} ${url}`,
                  entityType: this.getEntityType(url),
                  entityId: data?.id || body?.id || 'N/A',
                  details: JSON.stringify({
                    body: this.sanitizeBody(body),
                    response: data ? 'SUCCESS' : 'NO_CONTENT'
                  }),
                },
              });
            }
          } catch (error) {
            console.error('[AUDIT] Failed to log action:', error);
          }
        }),
      );
    }

    return next.handle();
  }

  private getEntityType(url: string): string {
    if (url.includes('/products')) return 'PRODUCT';
    if (url.includes('/users')) return 'USER';
    if (url.includes('/orders')) return 'ORDER';
    if (url.includes('/finance')) return 'FINANCE';
    if (url.includes('/discounts')) return 'DISCOUNT';
    return 'OTHER';
  }

  private sanitizeBody(body: any): any {
    if (!body) return null;
    const sanitized = { ...body };
    // Remove sensitive fields from logs
    delete sanitized.password;
    delete sanitized.token;
    delete sanitized.iban;
    return sanitized;
  }
}
