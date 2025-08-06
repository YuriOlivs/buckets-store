import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import HttpResponse from "../dto/http-response.dto";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        if (data instanceof HttpResponse) return data;

        const { message, payload } = data || {};
        return new HttpResponse(statusCode, message ?? 'Success', payload ?? data);
      }),
    );
  }
}