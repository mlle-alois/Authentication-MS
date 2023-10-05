import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordValidator } from './validators/password-validator.service';
import { LocalStrategy } from '../guards/local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, PasswordValidator, LocalStrategy],
})
export class AuthModule {}
