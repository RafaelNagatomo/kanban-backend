import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateColumnInput {
  @Field()
  name: string;

  @Field(() => Int)
  createdBy?: number;

  @Field(() => Int)
  boardId?: number;
}
