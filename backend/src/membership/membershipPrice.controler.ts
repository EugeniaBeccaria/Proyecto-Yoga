import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { MembershipPrice } from './membershipPrice.entity.js'


const em = orm.em

function sanitizeTallerInput(req: Request, res: Response, next: NextFunction) {
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
  try {
    const membershipPrice = em.create(MembershipPrice, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'membershipPrice created', data: membershipPrice })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
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

export {sanitizeTallerInput, findAll, findOne, add, update, remove}