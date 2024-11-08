import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Board } from '../board/board.entity';

@ObjectType()
export class Column {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

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

  @Field(() => Board)
  board?: Board;

  @Field(() => Int)
  boardId?: number;
}
