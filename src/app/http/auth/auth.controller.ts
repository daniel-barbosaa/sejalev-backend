import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/public.decorator';

import { SigninDto, SignupDto } from './auth.dto';
import { AuthService } from './auth.service';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInDto: SigninDto) {
    return this.authService.signin(signInDto);
  }

  @Post('signup')
  signUp(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
