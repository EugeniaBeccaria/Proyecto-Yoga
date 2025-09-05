import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { Time } from './time.entity.js'


const em = orm.em

function sanitizeTallerInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
    startDate: req.body.startDate,
    endDate: req.body.endDate
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
    const times = await em.find(Time, {}, { populate: ['classes'] })
    res.status(200).json({ message: 'found all times', data: times })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const time = await em.findOneOrFail(Time, { id }, { populate: ['classes'] })
    res.status(200).json({ message: 'found time', data: time })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const time = em.create(Time, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'time created', data: time })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const timeToUpdate = await em.findOneOrFail(Time, { id })
    em.assign(timeToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'user updated', data: timeToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const time = em.getReference(Time, id) 
    await em.removeAndFlush(time)
    res.status(200).send({ message: 'time deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {sanitizeTallerInput, findAll, findOne, add, update, remove}