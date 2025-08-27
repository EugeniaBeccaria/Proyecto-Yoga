import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql'; // Make sure this package is installed
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init<MySqlDriver>({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'yoga-studio',
  port: 3307,
  clientUrl: 'mysql://dsw:dsw@localhost:3307/yoga-studio',
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
})

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator()
  /*   
  await generator.dropSchema()
  await generator.createSchema()
  */
  await generator.updateSchema()
}