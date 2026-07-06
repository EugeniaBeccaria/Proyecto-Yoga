import { orm } from '../shared/DB/orm.js';
import { Membership } from '../membership/membership.entity.js';

const em = orm.em;

async function findOneBySessionId(sessionId: string) {
  return await em.findOneOrFail(Membership, { stripeSessionId: sessionId }, { populate: ['membershipType'] });
}

async function findOneByUserId(userId: string) {
  return await em.findOne(Membership, { user: userId, status: 'active' }, { populate: ['membershipType'] });
}

export const membershipService = {
  findOneBySessionId,
  findOneByUserId
};