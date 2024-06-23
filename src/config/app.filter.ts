import { BaseResult } from '@core/base.result';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const stt = exception.getStatus();

        const msgs = exception.response?.message;
        delete exception.response;

        const result = Object.assign(new BaseResult(), {
            success: false,
            error: {
                ...exception,
                message: Array.isArray(msgs)
                    ? msgs.map((m) => ({
                          property: m.property,
                          constraints: m.constraints,
                      }))
                    : msgs,
            },
            path: req.url,
        });
        res.status(stt).json(result);
    }
}
