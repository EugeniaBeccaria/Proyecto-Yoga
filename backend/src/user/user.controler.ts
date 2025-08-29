import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { User } from './user.entity.js'

const em = orm.em


async function findAll(req: Request, res: Response) {
  try {
    const users = await em.find(User, {})
    res.status(200).json({ message: 'found all character classes', data: users })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const user = await em.findOneOrFail(User, { id })
    res.status(200).json({ message: 'found user', data: user })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const user = em.create(User, req.body)
    await em.flush()
    res.status(201).json({ message: 'user created', data: user })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


async function update(req: Request, res: Response) {
  res.status(500).json({ message: 'not implemented' })
}

async function remove (req: Request, res: Response) {
  res.status(500).json({ message: 'not implemented' })
}

export {findAll, findOne, add, update, remove}