import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { RegisterRequestDto } from './dto/register-request.dto';
import { MailAlreadyUsedException } from '../exceptions/mail-already-used.exception';
import { PasswordValidator } from './validators/password-validator.service';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly passwordValidator: PasswordValidator,
  ) {}

  public async register(registerRequest: RegisterRequestDto) {
    const foundUser = await this.userRepository.findOneBy({
      email: registerRequest.email,
    });
    if (foundUser != null) {
      throw new MailAlreadyUsedException();
    }

    this.passwordValidator.validate(
      registerRequest.password,
      registerRequest.confirmPassword,
    );
    const user = new User();
    user.email = registerRequest.email;
    user.firstname = registerRequest.firstname;
    user.lastname = registerRequest.lastname;
    user.password = await hash(registerRequest.password);

    await this.userRepository.save(user);
  }

  public async getAuthenticatedUser(email: string, checkedPassword: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const passwordMatched = await verify(user.password, checkedPassword);
    if (!passwordMatched) {
      throw new InvalidCredentialsException();
    }

    return user;
  }

  public getJwtToken(userId: number): string {
    return this.jwtService.sign({ userId: userId });
  }
}
