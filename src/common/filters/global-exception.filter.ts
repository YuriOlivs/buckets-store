import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import ErrorResponse from "../dto/error-response.dto";

@Catch()
export default class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly adapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.adapterHost;
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const path = httpAdapter.getRequestUrl(req);

    let status: number;
    let body: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      const message =
        typeof response === 'string'
          ? response
          : (response as any).message || 'Unexpected error';

      body = new ErrorResponse(status, message, path);
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      body = new ErrorResponse(status, 'Internal server error', path);
    }

    httpAdapter.reply(res, body, status);
  }
}
