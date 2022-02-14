import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import COMMON_UTIL from '@src/utils/common.util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T | undefined;
}

@Injectable()
class TransformInterceptor<T>
implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map((data) => {
          if (!COMMON_UTIL.isProduction) {
            Logger.debug('======================= Development Response Transform =======================');
            Logger.debug(`\n${JSON.stringify(data, null, 2)}\n`);
          }
          return {
            statusCode: context.switchToHttp().getResponse().statusCode as number,
            message: (data && data.message) ? data.message as string : '',
            data: (data && data.data) ? data.data as T : undefined,
            error: undefined,
          };
        }),
      );
  }
}

export default TransformInterceptor;
