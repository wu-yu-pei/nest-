import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './logical/user/user.module';

@Module({
  imports: [UserModule], // 如果像使用其他模块的service 在这里导入即可(需要其他模块导出)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
