import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { Classs } from './classs.entity.js' 


const em = orm.em

function sanitizeClasssInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    capacityLimit: req.body.capacityLimit
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
    const classes = await em.find(Classs, {}, { populate: ['day', 'time', 'room'] }) //populate indica a MikroORM que haga joins con las tablas relacionadas
    res.status(200).json({ message: 'found all classes', data: classes })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const classs = await em.findOneOrFail(Classs, { id }, { populate: ['day', 'time', 'room'] })
    res.status(200).json({ message: 'found class', data: classs })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const classs = em.create(Classs, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'class created', data: classs })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const classsToUpdate = await em.findOneOrFail(Classs, { id })
    em.assign(classsToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'class updated', data: classsToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const classs = em.getReference(Classs, id)  
    await em.removeAndFlush(classs)
    res.status(200).send({ message: 'class deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {sanitizeClasssInput, findAll, findOne, add, update, remove}