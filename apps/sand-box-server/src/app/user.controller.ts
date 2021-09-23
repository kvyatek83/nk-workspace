import { Controller, Get, Post, Body, UnauthorizedException, BadRequestException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth/auth.service';

@Controller('/auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

//   @Post('register')
//     async register(
//         @Body('name') name: string,
//         @Body('email') email: string,
//         @Body('password') password: string
//     ) {
//         const hashedPassword = await bcrypt.hash(password, 12);

//         const user = await this.userService.create({
//             name,
//             email,
//             password: hashedPassword
//         });

//         delete user.password;

//         return user;
//     }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        // @Res({passthrough: true}) response: Response
    ) {
        // const user = await this.userService.findOne(email);

        // if (!user) {
        //     throw new BadRequestException('invalid credentials');
        // }

        // if (!await bcrypt.compare(password, user.password)) {
        //     throw new BadRequestException('invalid credentials');
        // }

        // // const jwt = await this.jwtService.signAsync({id: user.id});

        // // response.cookie('jwt', jwt, {httpOnly: true});
        // delete user.password;

        // return user;
        // return this.authService.login({username, password})
    }

}
