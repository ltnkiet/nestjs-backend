import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class EncodeDataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const body = request.body;
  
      if (body) {
        for (const key in body) {
          if (body.hasOwnProperty(key) && key !== 'password' && key !== 'email') {
            body[key] = encodeURIComponent(body[key]);
          }
        }
      }
  
      return next.handle().pipe(
        map((data) => {
          return data;
        }),
      );
    }
  }
  