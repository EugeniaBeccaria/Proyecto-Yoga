import {Request, Response, NextFunction} from 'express'
import { TallerRepository } from './taller.repository.js'
import { Taller } from './taller.entity.js'

const repository = new TallerRepository()

function sanitizeTallerInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    datetime: req.body.datetime,
    price: req.body.price,
    description: req.body.description
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res:Response){
    const id= req.params.id // hago esto porque findeOne espera un OBJETo con id
    const taller = await repository.findOne({id})
    if (!taller) {
    return res.status(404).send({ message: 'taller not found' })
    }
    res.json({ data: taller })        
}

async function add(req: Request, res: Response){
  const input = req.body.sanitizedInput
  const tallerInput = new Taller(
    input.name, 
    input.datetime, 
    input.price, 
    input.description, 
    input.cupo)
  const taller=  await repository.add(tallerInput)
  res.status(201).send({message: 'taller created', data: taller})
}

async function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id 
  const taller= await repository.update(req.params.id, req.body.sanitizedInput)
  if (!taller) {
    return res.status(404).send({ message: 'taller not found' })
  }
 return res.status(200).send({ message: 'taller updated successfully', data: taller })
}

async function remove (req: Request, res: Response) {
  const id = req.params.id
  const taller = await repository.delete({id})
  if (!taller) {
    res.status(404).send({ message: 'taller not found' })
  } else {
    res.status(200).send({ message: 'taller deleted successfully' })
  }
}

export {sanitizeTallerInput, findAll, findOne, add, update, remove}