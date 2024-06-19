import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogModel } from './log.model';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    constructor(private readonly logModel: LogModel) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();
        const requestTime = Date.now();

        return next
            .handle()
            .pipe(
                tap(async (response) => {
                    const diffTime = Date.now() - requestTime;

                    await this.logModel.createLog({
                        request: request,
                        response: response,
                        responseTime: diffTime
                    })
                }),
            );
    }
}