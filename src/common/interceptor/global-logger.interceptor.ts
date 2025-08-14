import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import RequestWithUser from 'src/modules/auth/dto/req-with-user.dto';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor (private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request | RequestWithUser>();
    const res = context.switchToHttp().getResponse<Response>();

    const instant = Date.now();

    return next.handle().pipe(
      tap(() => {
        const logData = {
          method: req.method,
          path: req.originalUrl || req.url,
          userId: 'user' in req ? req.user.sub : null,
          status: res.statusCode,
          duration: `${Date.now() - instant}ms`,
        };

        this.logger.log(`${logData.method} ${logData.path} | ${logData.duration} | Status: ${logData.status} | User: ${logData.userId}`);
      })
    );
  }
}
