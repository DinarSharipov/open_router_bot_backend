import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [UsersModule],
  providers: [PrismaService],
})
export class AppModule {}
