import {Router} from 'express'
import { findAll, findOne, add, update, remove } from './time.controler.js'

export const timeRouter = Router()

timeRouter.get('/', findAll)
timeRouter.get('/:id', findOne)
timeRouter.post('/', add)
timeRouter.put('/:id', update )
timeRouter.delete('/:id', remove)