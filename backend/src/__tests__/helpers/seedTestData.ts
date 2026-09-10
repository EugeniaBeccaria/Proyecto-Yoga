
import bcrypt from 'bcrypt';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../../user/user.entity.js';

export interface TestUsers {
  client: User;
  admin: User;
  professor: User;
}

export async function seedAuthUsers(em: EntityManager): Promise<TestUsers> {
  const password = await bcrypt.hash('Test1234!', 10);

  const client = em.create(User, {
    name: 'Cliente',
    lastname: 'Test',
    email: 'client@test.com',
    password,
    role: 'client',
  });

  const admin = em.create(User, {
    name: 'Admin',
    lastname: 'Test',
    email: 'admin@test.com',
    password,
    role: 'admin',
  });

  const professor = em.create(User, {
    name: 'Profe',
    lastname: 'Test',
    email: 'professor@test.com',
    password,
    role: 'professor',
  });

  await em.persistAndFlush([client, admin, professor]);
  return { client, admin, professor };
}
