import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsArray, IsDate, IsMongoId, IsOptional } from 'class-validator';

import { UserRoles } from './../../interfaces';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsMongoId()
  id: string;

  @Field(() => [UserRoles], { nullable: true })
  @IsArray()
  @IsOptional()
  roles?: UserRoles[];

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
