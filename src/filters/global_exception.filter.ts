import {
  ExceptionFilter, Catch,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import COMMON_UTIL from '@src/utils/common.util';

@Catch()
class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;

    const exceptionResponse = exception.getResponse ? exception.getResponse() : 'NO RESPONSE';
    Logger.error(JSON.stringify(exception));

    if (exception.response) {
      response
        .status(status)
        .json({
          statusCode: status,
          error: (exception.response && exception.response.error)
            ? exception.response.error
            : exception.message,
          message: (exception.response && exception.response.message)
            ? exception.response.message
            : exception.message,
          timestamp: COMMON_UTIL.convertPrettyKST(new Date()),
          path: request.url,
        });
    } else {
      response
        .status(status)
        .json({
          statusCode: status,
          error: (exception.message) ? exception.message : '',
          message: (exceptionResponse && exceptionResponse.error)
            ? exceptionResponse.error : exception.message,
          timestamp: COMMON_UTIL.convertPrettyKST(new Date()),
          path: request.url,
        });
    }
  }
}

export default GlobalExceptionFilter;
