import { Request, Response } from 'express'
import { orm } from '../shared/DB/orm.js'
import { Time } from './time.entity.js' 

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const times = await em.find(Time, {}, { orderBy: { startTime: 'ASC' } })
    res.status(200).json({ message: 'found all times', data: times })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const time = await em.findOneOrFail(Time, { id })
    res.status(200).json({ message: 'found time', data: time })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findAll, findOne }