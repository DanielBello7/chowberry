import { DynamicModule, Module } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Module({})
export class DrizzleModule {
  static register<T extends Record<string, unknown>>(
    db: NodePgDatabase<T> & {
      $client: Pool;
    },
  ): DynamicModule {
    return {
      module: DrizzleModule,
      global: true,
      providers: [
        {
          provide: 'DRIZZLE',
          useValue: db,
        },
      ],
      exports: ['DRIZZLE'],
    };
  }
}
