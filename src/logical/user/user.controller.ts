import {
  Controller,
  Post,
  Body,
  HttpCode,
  Header,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  // 这里由nest帮助我们实例化 userService 之后就可以用this.userService来访问了.
  constructor(private readonly usersService: UserService) {}

  @HttpCode(200)
  @Header('Keep-Alive', 'timeout=10') // 自定义请求头
  @Redirect('https://www.baidu.com', 301) // 重定向
  @Post('find-one')
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.username);
  }
}

//! 注意:
/**
 * 千万不要往 Controller 里面添加乱七八糟的东西，
 * 尤其不要在里面写业务逻辑，
 * Controller 就应该保持简洁、干净。
 * 很多前端刚写 Node 的时候，都喜欢在这里面写逻辑，只为了省事，
 * 殊不知这对后期的维护是个灾难。
 */
