import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export default class HttpExceptionFilter implements ExceptionFilter {
   catch(exception: unknown, host: ArgumentsHost) {
      const context = host.switchToHttp();
      const res = context.getResponse<Response>();
      const req = context.getRequest<Request>();

      const { status, body } = exception instanceof HttpException ? 
      {
         status: exception.getStatus(),
         body: exception.getResponse(),
      } : {
         status: HttpStatus.INTERNAL_SERVER_ERROR,
         body: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: new Date().toISOString(),
            path: req.url,
         }
      }

      res.status(status).json(body);
   }
}