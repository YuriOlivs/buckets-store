import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class EmptyListToNoContentInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<any>  {
      const response = context.switchToHttp().getResponse();

      return next.handle().pipe(
         map((data) => {
            if (Array.isArray(data) && data.length === 0) {
               response.status(HttpStatus.NO_CONTENT);
               return null;
            }
            return data;
         })
      );
   }
}