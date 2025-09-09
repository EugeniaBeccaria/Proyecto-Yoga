import {Router} from 'express'
import { findAll, findOne, add, update, remove } from './membershipPrice.controler.js'

export const membershipPriceRouter = Router()

membershipPriceRouter.get('/', findAll)
membershipPriceRouter.get('/:id', findOne)
membershipPriceRouter.post('/', add)
membershipPriceRouter.put('/:id', update )
membershipPriceRouter.delete('/:id', remove)