import { Router } from 'express'
import { findCurrentGrouped, updateByGroup } from './membershipPrice.controler.js'

export const membershipPriceRouter = Router()

membershipPriceRouter.get('/current-grouped', findCurrentGrouped)
membershipPriceRouter.post('/group-update', updateByGroup)