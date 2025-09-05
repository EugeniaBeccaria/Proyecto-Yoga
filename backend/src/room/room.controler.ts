import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { Room } from './room.entity.js'

const em = orm.em

function sanitizeRoomInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
    name: req.body.name
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
    const rooms = await em.find(Room, {}, { populate: ['talleres', 'classes'] })
    res.status(200).json({ message: 'found all rooms', data: rooms })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const room = await em.findOneOrFail(Room, { id })
    res.status(200).json({ message: 'found room', data: room })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const room = em.create(Room, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'room created', data: room })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const roomToUpdate = await em.findOneOrFail(Room, { id })
    em.assign(roomToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'room updated', data: roomToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const room = em.getReference(Room, id) 
    await em.removeAndFlush(room)
    res.status(200).send({ message: 'room deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {sanitizeRoomInput, findAll, findOne, add, update, remove}