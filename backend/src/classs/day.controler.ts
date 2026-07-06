import { Request, Response } from 'express'
import { orm } from '../shared/DB/orm.js'
import { Day } from './day.entity.js' 

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const days = await em.find(Day, {})
    res.status(200).json({ message: 'found all days', data: days })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const day = await em.findOneOrFail(Day, { id })
    res.status(200).json({ message: 'found day', data: day })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findAll, findOne }