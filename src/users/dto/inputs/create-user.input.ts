import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserRoles } from '../../interfaces';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @Field(() => [UserRoles], { defaultValue: [UserRoles.user] })
  @IsArray()
  @IsOptional()
  roles? = [UserRoles.user];
}
