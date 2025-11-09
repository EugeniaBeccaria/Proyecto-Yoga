import { MembershipType } from "./membershipType.entity.js";
import { MembershipPrice } from './membershipPrice.entity.js'
import { orm } from '../shared/DB/orm.js'

const em = orm.em

const GROUP_TO_TYPE_MAP: Record<number, number[]> = {
  1: [1, 2],
  2: [3, 4],
  3: [5, 6],
};

const GROUPS_DATA = [
    { id: 1, description: 'Membresía Básica (1-2 clases por semana)', typeIds: [1, 2], numOfClasses: 2 },
    { id: 2, description: 'Membresía tipo 1 (2-4 clases por semana)', typeIds: [3, 4], numOfClasses: 4 },
    { id: 3, description: 'Membresía Full (4-6 clases por semana)', typeIds: [5, 6], numOfClasses: 6 },
]

export class MembershipPriceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MembershipPriceError";
  }
}

async function add(price: number, membershipType: number) {
  const membershipTypeEntity = await em.findOne(MembershipType, { id: membershipType });
  if (!membershipTypeEntity) {
    throw new Error('Invalid foreign key reference: MembershipType con id ${membershipType} no existe');
  }

  const currentDate = new Date();
  const membershipPrice = em.create(MembershipPrice, {
    price: price,
    priceDate: currentDate,
    membershipType: membershipTypeEntity
  });
  await em.persistAndFlush(membershipPrice);
  return membershipPrice;
}

async function updateByGroup(groupId: number, price: number) {
  const typeIds = GROUP_TO_TYPE_MAP[groupId];

  if (!typeIds || typeIds.length === 0) {
    throw new MembershipPriceError(`El groupId ${groupId} no es válido`);
  }

  try {
    await Promise.all(
      typeIds.map(typeId => add(price, typeId))
    );
    return { message: `Grupo ${groupId} actualizado con éxito a $${price}` };
  } catch (error: any) {
    throw new MembershipPriceError(error.message);
  }
}

async function findCurrentGrouped() {
  const pricePromises = GROUPS_DATA.map(async (group) => {
    const latestPrice = await em.findOne(
      MembershipPrice,
      { membershipType: { id: { $in: group.typeIds } } },
      { orderBy: { priceDate: 'DESC' } }
    );

    return {
        id: group.id,
        description: group.description,
        price: latestPrice?.price || 0,
        numOfClasses: group.numOfClasses
    };
  });

    const groupedPrices = await Promise.all(pricePromises);
    return groupedPrices;
}

export const membershipPriceService = {
  add,
  updateByGroup,
  findCurrentGrouped
};