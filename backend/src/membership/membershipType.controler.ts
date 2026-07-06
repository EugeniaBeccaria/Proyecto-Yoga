import { Request, Response } from 'express'
import { orm } from '../shared/DB/orm.js'
import { MembershipType } from './membershipType.entity.js' 

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const membershipTypes = await em.find(MembershipType, {}, { populate: ['membershipPrices'] })
    res.status(200).json({ message: 'found all membershipTypes', data: membershipTypes })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const membershipType = await em.findOneOrFail(MembershipType, { id }, { populate: ['membershipPrices'] })
    res.status(200).json({ message: 'found membershipType', data: membershipType })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findAll, findOne }