import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit {
  primary: PrismaClient;
  replica: PrismaClient;

  constructor() {
    this.primary = new PrismaClient({
      datasources: {
        db: { url: process.env.DATABASE_URL },
      },
    });

    this.replica = new PrismaClient({
      datasources: {
        db: { url: process.env.DATABASE_REPLICA_URL },
      },
    });
  }

  async onModuleInit() {
    await this.primary.$connect();
    await this.replica.$connect();
  }
}