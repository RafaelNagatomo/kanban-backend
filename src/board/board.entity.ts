import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column } from 'src/column/column.entity';
import { User } from 'src/user/user.entity';

@ObjectType()
export class Board {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field(() => Int, { nullable: true })
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => Int, { nullable: true })
  updatedBy: number;

  @Field({ nullable: true })
  userId: number;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Column], { nullable: true })
  columns?: Column[];
}
