
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env.test') });

import { MikroORM, EntityManager } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

let orm: MikroORM<MySqlDriver>;


export async function setupTestOrm(): Promise<{ orm: MikroORM<MySqlDriver>; em: EntityManager }> {
  orm = await MikroORM.init<MySqlDriver>({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: process.env.DB_NAME ?? 'yoga-studio-test',
    clientUrl: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME ?? 'yoga-studio-test'}`,
    driver: MySqlDriver,
    highlighter: new SqlHighlighter(),
    debug: false,
    schemaGenerator: {
      disableForeignKeys: true,
      createForeignKeyConstraints: true,
    },
  });

  const generator = orm.getSchemaGenerator();
  await generator.ensureDatabase();
  await generator.createSchema();

  return { orm, em: orm.em.fork() };
}

export async function teardownTestOrm(): Promise<void> {
  if (!orm) return;
  await orm.getSchemaGenerator().dropSchema();
  await orm.close();
}


export async function clearDatabase(): Promise<void> {
  if (!orm) return;
  const connection = orm.em.getConnection();


  await connection.execute('SET FOREIGN_KEY_CHECKS = 0');

  const tables: { TABLE_NAME: string }[] = await connection.execute(
    `SELECT TABLE_NAME FROM information_schema.TABLES 
     WHERE TABLE_SCHEMA = '${process.env.DB_NAME ?? 'yoga-studio-test'}'`
  );

  for (const { TABLE_NAME } of tables) {
    await connection.execute(`TRUNCATE TABLE \`${TABLE_NAME}\``);
  }

  await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
}
