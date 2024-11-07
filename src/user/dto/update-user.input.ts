import { InputType, Field } from '@nestjs/graphql';
// import { CreateUserInput } from './create-user.input';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;
}
