import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CardService } from './card.service';
import { Card } from './card.entity';
import { CreateCardInput } from './dto/create.input';
import { UpdateCardInput } from './dto/update.input';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Card)
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  // @UseGuards(GqlAuthGuard)
  @Query(() => [Card])
  async getAllCards(
    @Args('orderBy', {
      type: () => String,
      nullable: true,
      defaultValue: 'asc',
    })
    orderBy: string,
    @Args('columnId', { type: () => Number, nullable: true })
    columnId?: number,
  ): Promise<Card[]> {
    const order = orderBy === 'asc' ? 'asc' : 'desc';
    return this.cardService.findAllCard({
      orderBy: { position: order },
      where: columnId ? { columnId } : undefined,
    });
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => Card)
  async getCardByColumnId(@Args('columnId') columnId: number): Promise<Card[]> {
    return this.cardService.findCardBycolumnId(columnId);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Card)
  async createCard(@Args('data') data: CreateCardInput): Promise<Card> {
    return this.cardService.createCard(data);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Card)
  async updateCard(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateCardInput,
  ): Promise<Card> {
    return this.cardService.updateCard(id, data);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteCard(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.cardService.deleteCard(id);
  }
}
