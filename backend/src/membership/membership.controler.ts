import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { Membership } from './membership.entity.js'


const em = orm.em

function sanitizeMembershipInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    status: req.body.status
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
    const memberships = await em.find(Membership, {}, { populate: ['membershipType'] })
    res.status(200).json({ message: 'found all memberships', data: memberships })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const membership = await em.findOneOrFail(Membership, { id }, { populate: ['membershipType'] })
    res.status(200).json({ message: 'found membership', data: membership })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOneByUserId(req: Request, res: Response) {
  try {
    const userId = Number.parseInt(req.params.userId)
    const membership = await em.findOneOrFail(Membership, { user: userId }, { populate: ['membershipType'] })
    res.status(200).json({ message: 'found membership', data: membership })
  }
  catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const membership = em.create(Membership, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'membership created', data: membership })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const membershipToUpdate = await em.findOneOrFail(Membership, { id })
    em.assign(membershipToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'membership updated', data: membershipToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const membership = em.getReference(Membership, id)  
    await em.removeAndFlush(membership)
    res.status(200).send({ message: 'membership deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {sanitizeMembershipInput, findAll, findOne, add, update, remove, findOneByUserId}