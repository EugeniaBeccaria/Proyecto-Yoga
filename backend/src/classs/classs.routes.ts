import {Router} from 'express'
import { findAll, findOne, add, update, remove } from './classs.controler.js'

export const classsRouter = Router()

classsRouter.get('/', findAll)
classsRouter.get('/:id', findOne)
classsRouter.post('/', add)
classsRouter.put('/:id', update )
classsRouter.delete('/:id', remove)