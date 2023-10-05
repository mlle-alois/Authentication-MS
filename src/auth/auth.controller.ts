import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginRequestDto } from './dto/login-request.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginRequest: LoginRequestDto, @Req() request) {
    const user: User = request.user;
    return this.authService.getJwtToken(user.id);
  }

  @Post('/register')
  async register(@Body() registerRequest: RegisterRequestDto) {
    await this.authService.register(registerRequest);
  }
}
