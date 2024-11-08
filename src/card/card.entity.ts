import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column } from '../column/column.entity';

@ObjectType()
export class Card {
  @Field(() => Int)
  id: number;

  @Field()
  title?: string;

  @Field()
  description?: string;

  @Field()
  position?: number;

  @Field()
  createdAt: Date;

  @Field()
  createdBy: number;

  @Field()
  updatedAt: Date;

  @Field()
  updatedBy: number;

  @Field(() => Column)
  column?: Column;

  @Field(() => Int)
  columnId?: number;
}
