import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'John' })
  readonly firstname: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'Do' })
  readonly lastname: string;

  @IsEmail()
  @ApiProperty({ default: 'john.do@gmail.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ default: 'Azerty1234!' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ default: 'Azerty1234!' })
  @IsNotEmpty()
  readonly confirmPassword: string;
}
