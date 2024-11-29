import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardInput } from './dto/create.input';
import { UpdateCardInput } from './dto/update.input';
import { Card } from './card.entity';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCard(params: {
    orderBy: { position: 'asc' | 'desc' };
    where?: { columnId: number };
  }): Promise<Card[]> {
    return this.prisma.card.findMany({
      orderBy: params.orderBy,
      where: params.where,
      include: {
        column: true,
      },
    });
  }

  async findCardBycolumnId(columnId: number): Promise<Card[]> {
    return this.prisma.card.findMany({
      where: { columnId: columnId },
    });
  }

  async createCard(data: CreateCardInput): Promise<Card> {
    const lastPosition = await this.prisma.card.findFirst({
      where: { columnId: data.columnId },
      orderBy: { position: 'desc' },
      select: { position: true },
    });
    const nextPosition = (lastPosition?.position || 0) + 1;

    return this.prisma.card.create({
      data: {
        name: data.name,
        description: data.description,
        position: nextPosition,
        createdBy: data.createdBy,
        column: { connect: { id: data.columnId } },
      },
    });
  }

  async updateCard(
    id: number,
    updateCardInput: UpdateCardInput,
  ): Promise<Card> {
    return this.prisma.card.update({
      where: { id },
      data: updateCardInput,
    });
  }

  async deleteCard(id: number): Promise<boolean> {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    await this.prisma.card.delete({
      where: { id },
    });

    return true;
  }
}
