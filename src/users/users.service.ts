import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateUserDTO } from './dto/create.user.dto.js';
import { GetManyUsersDTO } from './dto/get.many.users.dto.js';
import { GetManyUsersQueryDTO } from './dto/get.many.users.query.dto.js';
import { GetUserDTO } from './dto/get.user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany(query: GetManyUsersQueryDTO): Promise<GetManyUsersDTO> {
    const count = await this.prisma.user.count({
      where: { name: query.search },
    });
    const data = await this.prisma.user.findMany({
      take: query.take,
      skip: query.skip,
      where: {
        name: query.search,
      },
      orderBy: { name: 'asc' },
    });
    return {
      count,
      data,
    };
  }

  async getOne(id: string): Promise<GetUserDTO> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Не найден');
    }

    return user;
  }

  async create(data: CreateUserDTO): Promise<string> {
    await this.checkTelegramId(data.telegramId);
    const { id } = await this.prisma.user.create({ data });
    return id;
  }

  async update(id: string, data: CreateUserDTO): Promise<CreateUserDTO> {
    const findOne = await this.prisma.user.findFirst({
      where: { id },
    });
    const anyOne = await this.prisma.user.findFirst({
      where: { telegramId: data.telegramId },
    });
    if (!findOne) {
      throw new NotFoundException('Нет пользователя с таким id');
    }
    if (anyOne && anyOne.id !== findOne.id) {
      throw new ConflictException(
        'Уже есть другой пользователь с таким telegramId',
      );
    }
    await this.prisma.user.update({
      where: { id },
      data,
    });
    return findOne;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  private async checkTelegramId(telegramId: number): Promise<void> {
    const existingOne = await this.prisma.user.findFirst({
      where: {
        telegramId,
      },
    });

    if (existingOne) {
      throw new ConflictException(
        `Пользователь с таким telegramId уже существует\n telegramId: ${existingOne.telegramId}\ndbId: ${existingOne.id}`,
      );
    }
  }
}
