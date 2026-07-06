import { Request, Response } from 'express'
import { orm } from '../shared/DB/orm.js'
import { Room } from './room.entity.js'

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const rooms = await em.find(Room, {})
    res.status(200).json({ message: 'found all rooms', data: rooms })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findAll }