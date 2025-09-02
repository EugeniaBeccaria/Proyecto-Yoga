import {Request, Response, NextFunction} from 'express'
import { Taller } from './taller.entity.js'
import { orm } from '../shared/DB/orm.js'

const em = orm.em

function sanitizeTallerInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    cupo: req.body.cupo,
    datetime: req.body.datetime,
    price: req.body.price,
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
    const talleres = await em.find(Taller, {}, { populate: ['users'] })
    res.status(200).json({ message: 'found all talleres', data: talleres })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const taller = await em.findOneOrFail(Taller, { id }, { populate: ['users'] })
    res.status(200).json({ message: 'found taller', data: taller })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const taller = em.create(Taller, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'taller created', data: taller })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tallerToUpdate = await em.findOneOrFail(Taller, { id })
    em.assign(tallerToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'taller updated', data: tallerToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const taller = em.getReference(Taller, id)
    await em.removeAndFlush(taller)
    res.status(200).send({ message: 'taller deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {sanitizeTallerInput, findAll, findOne, add, update, remove}