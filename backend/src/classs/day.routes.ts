import {Router} from 'express'
import { findAll, findOne, add, update, remove } from './day.controler.js'

export const dayRouter = Router()

dayRouter.get('/', findAll)
dayRouter.get('/:id', findOne)
dayRouter.post('/', add)
dayRouter.put('/:id', update )
dayRouter.delete('/:id', remove)