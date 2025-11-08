import {Router} from 'express'
import { findAll, findOne, add, update, remove, findCurrentGrouped, updateByGroup } from './membershipPrice.controler.js'

export const membershipPriceRouter = Router()

membershipPriceRouter.get('/current-grouped', findCurrentGrouped);
membershipPriceRouter.post('/group-update', updateByGroup);
membershipPriceRouter.get('/', findAll)
membershipPriceRouter.get('/:id', findOne)
membershipPriceRouter.post('/', add)
membershipPriceRouter.put('/:id', update )
membershipPriceRouter.delete('/:id', remove)