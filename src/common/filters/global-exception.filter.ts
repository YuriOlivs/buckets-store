import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import ErrorResponse from "../dto/error-response.dto";

@Catch()
export default class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly adapterHost: HttpAdapterHost,
    private logger: ConsoleLogger
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);
    console.error(exception);

    const { httpAdapter } = this.adapterHost;
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const path = httpAdapter.getRequestUrl(req);

    if('user' in req) {
      this.logger.log(`Accessed ${path} by User ID: ${req.user.sub}`);
    }

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
