import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from './../../common/entities/base.entity';

import { UserRoles } from '../interfaces';

@ObjectType()
@Schema({ timestamps: true })
export class User extends BaseEntity {
  @Field(() => String)
  @Prop({
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
    index: true,
    unique: true,
  })
  username: string;

  @Field(() => String)
  @Prop({
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
    index: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  })
  password: string;

  @Field(() => [UserRoles])
  @Prop({ type: [String], enum: UserRoles, default: [UserRoles.user] })
  roles: UserRoles;

  @Field(() => User, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  updatedBy?: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
