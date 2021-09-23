import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  // async validateUser(user: User): Promise<User> {
  //   const currUser = await this.userService.findOne(user.email);

  //   if (!currUser) {
  //     throw new BadRequestException('invalid credentials');
  //   }

  //   if (!(await bcrypt.compare(user.password, currUser.password))) {
  //     throw new BadRequestException('invalid credentials');
  //   }

  //   //   const { password, ...result } = user;
  //   return user;
  // }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    console.log('AuthService validateUser');
    
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
