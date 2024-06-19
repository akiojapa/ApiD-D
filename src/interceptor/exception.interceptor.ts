import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogModel } from './log.model';

@Injectable()
export class ExceptionLoggingInterceptor implements NestInterceptor {

    private readonly logger = new Logger(ExceptionLoggingInterceptor.name);
    
    constructor(private readonly logModel: LogModel) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const requestTime = Date.now();
        return next.handle().pipe(
            catchError((err) => {
                const diffTime = Date.now() - requestTime;
                const ctx = context.switchToHttp();
                const request = ctx.getRequest<Request>();
                this.logModel.createLog({
                    request: request,
                    error: err,
                    responseTime: diffTime
                })

                return throwError(() => err);
            }),
        );
    }
}