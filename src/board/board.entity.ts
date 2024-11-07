import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class Board {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  updatedBy: number;

  @Field()
  userId: number;

  @Field(() => User)
  user?: User;
}
