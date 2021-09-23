import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  getData() {
    return 'hello';
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);

    // return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  getProfile(@Request() req) {
    return req.user;
  }
}
