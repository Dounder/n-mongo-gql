import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType({ isAbstract: true })
export class BaseEntity extends Document {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, required: false, default: null })
  deletedAt: Date;
}
