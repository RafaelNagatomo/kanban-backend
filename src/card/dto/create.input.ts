import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCardInput {
  @Field()
  name?: string;

  @Field()
  description?: string;

  @Field(() => Int)
  createdBy?: number;

  @Field(() => Int)
  columnId?: number;
}
