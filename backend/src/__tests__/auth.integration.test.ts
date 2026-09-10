
import { jest, describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';

jest.unstable_mockModule('axios', () => ({
  default: {
    post: jest.fn(() => Promise.resolve({ data: { success: true } })),
  },
}));

let _testEm: any = null;
const emProxy = new Proxy({} as any, {
  get(_target, prop: string) {
    if (_testEm && typeof _testEm[prop] === 'function') {
      return (...args: any[]) => _testEm[prop](...args);
    }
    return _testEm?.[prop];
  },
});
jest.unstable_mockModule('../shared/DB/orm.js', () => ({
  orm: { em: emProxy },
  syncSchema: jest.fn(),
}));

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

const { MikroORM, RequestContext } = await import('@mikro-orm/core');
const { MySqlDriver } = await import('@mikro-orm/mysql');
const { SqlHighlighter } = await import('@mikro-orm/sql-highlighter');
const { User } = await import('../user/user.entity.js');
const bcrypt = await import('bcrypt');
const express = (await import('express')).default;
const cookieParser = (await import('cookie-parser')).default;
const cors = (await import('cors')).default;
const supertest = (await import('supertest')).default;
const { authRouter } = await import('../auth/auth.routes.js');


let testOrm: InstanceType<typeof MikroORM>;
let testApp: ReturnType<typeof express>;

beforeAll(async () => {
  testOrm = await MikroORM.init({
    entities: ['src/**/*.entity.ts'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: process.env.DB_NAME ?? 'yoga_studio_test',
    clientUrl: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME ?? 'yoga_studio_test'}`,
    driver: MySqlDriver,
    highlighter: new SqlHighlighter(),
    debug: false,
    schemaGenerator: { disableForeignKeys: true },
  });


  await testOrm.getSchemaGenerator().updateSchema();


  _testEm = testOrm.em;

  testApp = express();
  testApp.use(cors({ origin: '*', credentials: true }));
  testApp.use(express.json());
  testApp.use(cookieParser());
  testApp.use((_req: any, _res: any, next: any) => {
    RequestContext.create(testOrm.em, next);
  });
  testApp.use('/auth', authRouter);
});

afterAll(async () => {
  if (testOrm) await testOrm.close();
});

beforeEach(async () => {
  const connection = testOrm.em.getConnection();
  await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
  await connection.execute('TRUNCATE TABLE `user`');
  await connection.execute('SET FOREIGN_KEY_CHECKS = 1');

  const em = testOrm.em.fork();
  const password = await bcrypt.hash('Test1234!', 10);
  em.create(User, {
    name: 'Cliente',
    lastname: 'Test',
    email: 'client@test.com',
    password,
    role: 'client',
  });
  await em.flush();
});


describe('POST /auth/login', () => {
  it('login exitoso → retorna 200, datos del usuario y cookies JWT', async () => {
    const res = await supertest(testApp)
      .post('/auth/login')
      .send({
        email: 'client@test.com',
        password: 'Test1234!',
        captchaToken: 'fake-token',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('client@test.com');
    expect(res.body.user.role).toBe('client');
    expect(res.body.user.id).toBeDefined();

    const cookies = res.headers['set-cookie'] as string[] | string;
    const cookieArr = Array.isArray(cookies) ? cookies : [cookies];
    expect(cookieArr.some((c: string) => c.startsWith('accessToken='))).toBe(true);
    expect(cookieArr.some((c: string) => c.startsWith('refreshToken='))).toBe(true);
  });
});
