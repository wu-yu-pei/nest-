// import { Injectable, NestMiddleware } from '@nestjs/common';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     next();
//   }
// }

// src/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const code = res.statusCode; // 响应状态码
    next();
    // 组装日志信息
    const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`;
    console.log(logFormat);
  }
}
