import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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

  /** Получить всех пользователей */
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
      include: { favoriteModels: true },
    });
    return {
      count,
      data,
    };
  }

  /** Поиск по айди */
  async getOne(id: string): Promise<GetUserDTO> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        favoriteModels: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Не найден');
    }

    return user;
  }

  /** Поиск по телеграм айди */
  async getOneByTelegramId(telegramId: number): Promise<GetUserDTO> {
    if (Number.isNaN(+telegramId)) {
      throw new InternalServerErrorException(
        `ID должен быть int : ${telegramId}`,
      );
    }
    const user = await this.prisma.user.findFirst({
      where: { telegramId: Number(telegramId) },
      include: { favoriteModels: true },
    });

    if (!user) {
      throw new NotFoundException('Не найден');
    }

    return user;
  }

  /** Создание пользователя */
  async create(data: CreateUserDTO): Promise<string> {
    await this.checkTelegramId(data.telegramId);
    const { id } = await this.prisma.user.create({
      data: {
        ...data,
        favoriteModels: { create: data.favoriteModels },
      },
    });
    return id;
  }

  /** Изменение пользователя */
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
      data: {
        ...data,
        favoriteModels: {
          deleteMany: {},
          create: data.favoriteModels?.map((model) => ({
            modelId: model.modelId,
            architecture: model.architecture,
            name: model.name,
          })),
        },
      },
    });
    return findOne;
  }

  /** Удаление пользователя */
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  /** Проверка что такого телеграм айди еще нет */
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
