import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Query(() => User, { name: 'user' })
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User | null> {
    return this.userService.findUserById(id);
  }

  @Query(() => User, { name: 'userByEmail', nullable: true })
  async getUserByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User | null> {
    return this.userService.findUserByEmail(email);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.userService.createUser(data);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
