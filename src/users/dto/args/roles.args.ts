import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { UserRoles } from './../../interfaces/user.interface';

@ArgsType()
export class RoleArg {
  @Field(() => [UserRoles], { nullable: true })
  @IsArray()
  roles: UserRoles[] = [];
}
