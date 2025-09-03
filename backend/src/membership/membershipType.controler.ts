import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { MembershipType } from './membershipType.entity.js'


const em = orm.em

function sanitizeTallerInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
    numOfClasses: req.body.numOfClasses,
    description: req.body.description
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
    const membershipTypes = await em.find(MembershipType, {}, { populate: ['memberships', 'membershipPrices'] })
    res.status(200).json({ message: 'found all membershipTypes', data: membershipTypes })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const membershipType = await em.findOneOrFail(MembershipType, { id }, { populate: ['memberships', 'membershipPrices'] })
    res.status(200).json({ message: 'found membershipType', data: membershipType })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const membershipType = em.create(MembershipType, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'membershipType created', data: membershipType })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const membershipTypeToUpdate = await em.findOneOrFail(MembershipType, { id })
    em.assign(membershipTypeToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'membershipType updated', data: membershipTypeToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const membershipType = em.getReference(MembershipType, id)  
    await em.removeAndFlush(membershipType)
    res.status(200).send({ message: 'membershipType deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {sanitizeTallerInput, findAll, findOne, add, update, remove}