import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @Post('signin')
  async signin(@Body(new ValidationPipe()) signinDto: SigninDto) {
    const response = await this.authServices.signin(signinDto);
    return response;
  }

  @Post('signup')
  async signup(@Body(new ValidationPipe()) signupDto: SignupDto) {
    const response = await this.authServices.signup(signupDto);
    return response;
  }
}
