import {Router} from 'express'
import { findAll, findOne, add, update, remove } from './membership.controler.js'

export const membershipRouter = Router()

membershipRouter.get('/', findAll)
membershipRouter.get('/:id', findOne)
membershipRouter.post('/', add)
membershipRouter.put('/:id', update )
membershipRouter.delete('/:id', remove)