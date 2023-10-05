import { Injectable } from '@nestjs/common';
import { passwordStrength } from 'check-password-strength';
import { PasswordAndConfirmPasswordNotMatchException } from '../../exceptions/password-and-confirm-not-match.exception';
import { BadPasswordFormatException } from '../../exceptions/bad-password-format.exception';

@Injectable()
export class PasswordValidator {
  validate(password: string, confirmPassword: string): void {
    if (confirmPassword != password) {
      throw new PasswordAndConfirmPasswordNotMatchException();
    }
    const strength = passwordStrength(password);
    if (
      strength.id < 2 ||
      strength.length < 8 ||
      !strength.contains.includes('uppercase') ||
      !strength.contains.includes('lowercase') ||
      !strength.contains.includes('number') ||
      !strength.contains.includes('symbol')
    ) {
      throw new BadPasswordFormatException();
    }
  }
}
