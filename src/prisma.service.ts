import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { env } from 'prisma/config';
import { PrismaClient } from './generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString:
        env('DEV') === 'true' ? env('DATABASE_URL_LOCAL') : env('DATABASE_URL'),
    });
    super({ adapter });
  }
}
