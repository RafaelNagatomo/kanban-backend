import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/create.input';
import { UpdateBoardInput } from './dto/update.input';
import { Board } from './board.entity';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from 'src/auth/auth.guard';

@Resolver('Board')
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  // @UseGuards(GqlAuthGuard)
  @Query(() => [Board])
  async getAllBoards(
    @Args('orderBy', {
      type: () => String,
      nullable: true,
      defaultValue: 'asc',
    })
    orderBy: string,
  ): Promise<Board[]> {
    const order = orderBy === 'asc' ? 'asc' : 'desc';
    return this.boardService.findAllBoards({
      orderBy: { id: order },
    });
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => Board)
  async getBoardById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Board> {
    return this.boardService.findBoardById(id);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Board)
  async createBoard(@Args('data') data: CreateBoardInput) {
    return this.boardService.createBoard(data);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Board)
  async updateBoard(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateBoardInput,
  ): Promise<Board> {
    return this.boardService.updateBoard(id, data);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteBoard(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.boardService.deleteBoard(id);
  }
}
