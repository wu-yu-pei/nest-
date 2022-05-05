import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  // 这里由nest帮助我们实例化 userService 之后就可以用this.userService来访问了.
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  // @HttpCode(200)
  // @Header('Keep-Alive', 'timeout=10') // 自定义请求头
  // @Redirect('https://www.baidu.com', 301) // 重定向
  @Post('find-one')
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.username);
  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('register')
  async register(@Body() body: any) {
    return await this.usersService.register(body);
  }

  @Post('login')
  async login(@Body() loginParmas: any) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.username,
      loginParmas.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
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
