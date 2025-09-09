import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { Day } from './day.entity.js' 


const em = orm.em

function sanitizeDayInput(req: Request, res: Response, next: NextFunction) {
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
    const days = await em.find(Day, {})
    res.status(200).json({ message: 'found all days', data: days })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const day = await em.findOneOrFail(Day, { id })
    res.status(200).json({ message: 'found day', data: day })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const day = em.create(Day, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'day created', data: day })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const dayToUpdate = await em.findOneOrFail(Day, { id })
    em.assign(dayToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'day updated', data: dayToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const day = em.getReference(Day, id)  
    await em.removeAndFlush(day)
    res.status(200).send({ message: 'day deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {sanitizeDayInput, findAll, findOne, add, update, remove}