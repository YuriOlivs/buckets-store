import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import RequestWithUser from 'src/modules/auth/dto/req-with-user.dto';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor (private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request | RequestWithUser>();
    return next.handle().pipe(
      tap(() => {
        if ('user' in req) {
          this.logger.log(`Accessed ${req.url} by User ID: ${req.user.sub}`);
        }
      })
    );
  }
}
