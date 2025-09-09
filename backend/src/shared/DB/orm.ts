import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql'; 
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init<MySqlDriver>({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'yoga-studio',
  clientUrl: 'mysql://dsw:dsw@localhost:3307/yoga-studio',
  highlighter: new SqlHighlighter(),
  driver: MySqlDriver,
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