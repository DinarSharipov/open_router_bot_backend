import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create.user.dto.js';
import { GetManyUsersQueryDTO } from './dto/get.many.users.query.dto.js';
import { GetUserDTO } from './dto/get.user.dto.js';
import { GetUserParams } from './dto/get.user.params.js';
import { UsersService } from './users.service.js';

@ApiBearerAuth('api-token')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Get()
  async getMany(@Query() query: GetManyUsersQueryDTO) {
    const data = await this.service.getMany(query);
    return data;
  }

  @Get(':id')
  getOne(@Param() { id }: GetUserParams): Promise<GetUserDTO> {
    return this.service.getOne(id);
  }

  @Get('getByTelegramId/:id')
  getOneByTelegramId(@Param() id: number): Promise<GetUserDTO> {
    return this.service.getOneByTelegramId(id);
  }

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<GetUserDTO> {
    const id = await this.service.create(data);
    return this.service.getOne(id);
  }

  @Put(':id')
  async update(
    @Param() { id }: GetUserParams,
    @Body() data: CreateUserDTO,
  ): Promise<GetUserDTO> {
    await this.service.update(id, data);
    return this.service.getOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() { id }: GetUserParams): Promise<void> {
    return this.service.delete(id);
  }
}
