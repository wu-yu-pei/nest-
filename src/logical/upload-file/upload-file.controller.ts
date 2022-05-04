import { Controller, Get, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('upload-file')
export class UploadFileController {
  @Get()
  getFile(@Res() res: Response) {
    // 流式发送文件 速度比较快
    const file = createReadStream(join(process.cwd(), 'a.pdf'));

    file.pipe(res as any);
  }
}
