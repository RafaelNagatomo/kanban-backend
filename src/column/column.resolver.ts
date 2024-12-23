import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ColumnService } from './column.service';
import { Column } from './column.entity';
import { CreateColumnInput } from './dto/create.input';
import { UpdateColumnInput } from './dto/update.input';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Column)
export class ColumnResolver {
  constructor(private readonly columnService: ColumnService) {}

  // @UseGuards(GqlAuthGuard)
  @Query(() => [Column])
  async getAllColumns(
    @Args('orderBy', {
      type: () => String,
      nullable: true,
      defaultValue: 'asc',
    })
    orderBy: string,
    @Args('boardId', { type: () => Number, nullable: true })
    boardId?: number,
  ): Promise<Column[]> {
    const order = orderBy === 'asc' ? 'asc' : 'desc';
    return this.columnService.findAllColumn({
      orderBy: { position: order },
      where: boardId ? { boardId } : undefined,
    });
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => Column)
  async getColumnById(@Args('id') id: number): Promise<Column> {
    return this.columnService.findColumnById(id);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Column)
  async createColumn(@Args('data') data: CreateColumnInput): Promise<Column> {
    return this.columnService.createColumn(data);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Column)
  async updateColumn(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateColumnInput,
  ): Promise<Column> {
    return this.columnService.updateColumn(id, data);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => [Column])
  async updateColumnsPositions(
    @Args('columns', { type: () => [UpdateColumnInput] })
    columns: UpdateColumnInput[],
  ): Promise<Column[]> {
    const updatedColumns = await Promise.all(
      columns.map((column) =>
        this.columnService.updateColumn(column.id, {
          position: column.position,
        }),
      ),
    );

    return updatedColumns;
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteColumn(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.columnService.deleteColumn(id);
  }
}
