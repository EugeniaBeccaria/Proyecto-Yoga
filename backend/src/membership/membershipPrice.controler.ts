import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { MembershipPrice } from './membershipPrice.entity.js'
import { membershipPriceService, MembershipPriceError } from './membershipPrice.service.js';


const em = orm.em

interface MembershipPriceInput {
  membershipTypeId: number;
  price: number;
}

function sanitizeMembershipPriceInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
    price: req.body.price,
    priceDate: req.body.priceDate
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const membershipPrices = await em.find(MembershipPrice, {}, { populate: ['membershipType'] })
    res.status(200).json({ message: 'found all membershipsPrices', data: membershipPrices })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const membershipPrice = await em.findOneOrFail(MembershipPrice, { id }, { populate: ['membershipType'] })
    res.status(200).json({ message: 'found membershipPrice', data: membershipPrice })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  console.log("Cuerpo de la solicitud:", req.body);

  const {
          membershipTypeId,
          price,
      } = req.body as MembershipPriceInput;

  try {
    const membershipPrice = await membershipPriceService.add(price, membershipTypeId);
    res.status(201).json({ message: 'membershipPrice created', data: membershipPrice })
  } 
  catch (error: any) {
    if (error instanceof MembershipPriceError) {
      res.status(400).json({ message: error.message }); // 400 Bad Request (ej. ID no existe)
    } else {
      res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const membershipPriceToUpdate = await em.findOneOrFail(MembershipPrice, { id })
    em.assign(membershipPriceToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'membershipPrice updated', data: membershipPriceToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const membershipPrice = em.getReference(MembershipPrice, id)  
    await em.removeAndFlush(membershipPrice)
    res.status(200).send({ message: 'membershipPrice deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function updateByGroup(req: Request, res: Response) {
  const { groupId, price } = req.body as { groupId: number, price: number };

  if (groupId === undefined || price === undefined) {
      return res.status(400).json({ message: "Se requieren 'groupId' y 'price'" });
  }

  try {
      const result = await membershipPriceService.updateByGroup(groupId, price);
      res.status(201).json(result);
  } catch (error: any) {
      if (error instanceof MembershipPriceError) {
          res.status(400).json({ message: error.message });
      } else {
          res.status(500).json({ message: error.message });
      }
  }
}

async function findCurrentGrouped(req: Request, res: Response) {
  try {
    const data = await membershipPriceService.findCurrentGrouped();
    res.status(200).json({ message: 'Precios agrupados encontrados', data: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {sanitizeMembershipPriceInput, findAll, findOne, add, update, remove, updateByGroup, findCurrentGrouped}