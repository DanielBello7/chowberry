import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export type DB<T extends Record<string, unknown>> = NodePgDatabase<T> & {
  $client: Pool;
};
