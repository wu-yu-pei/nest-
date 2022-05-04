import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';

@Module({
  controllers: [UploadFileController],
})
export class UploadFileModule {}
