import {Request, Response, NextFunction} from 'express'
import { Taller } from './taller.entity.js'


function sanitizeTallerInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    datetime: req.body.datetime,
    price: req.body.price,
    description: req.body.description,
    cupo: req.body.cupo
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  res.status(500).json({ message: 'not implemented' })
}

async function findOne(req: Request, res:Response){
      res.status(500).json({ message: 'not implemented' })      
}

async function add(req: Request, res: Response){
  res.status(500).json({ message: 'not implemented' })
}

async function update(req: Request, res: Response) {
  res.status(500).json({ message: 'not implemented' })
}

async function remove (req: Request, res: Response) {
  res.status(500).json({ message: 'not implemented' })
}

export {sanitizeTallerInput, findAll, findOne, add, update, remove}