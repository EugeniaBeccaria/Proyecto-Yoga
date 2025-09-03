import {Router} from 'express'
import { findAll, findOne, add, update, remove } from './membershipType.controler.js'

export const membershipTypeRouter = Router()

membershipTypeRouter.get('/', findAll)
membershipTypeRouter.get('/:id', findOne)
membershipTypeRouter.post('/', add)
membershipTypeRouter.put('/:id', update )
membershipTypeRouter.delete('/:id', remove)