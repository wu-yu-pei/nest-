import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware as logger } from './middleware/logger.middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局路由前缀
  app.setGlobalPrefix('api');
  // 全局中间件
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
