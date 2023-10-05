import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;
}
