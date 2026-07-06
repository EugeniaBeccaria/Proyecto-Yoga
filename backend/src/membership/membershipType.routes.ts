import { Router } from 'express'
import { findAll, findOne } from './membershipType.controler.js'

export const membershipTypeRouter = Router()

membershipTypeRouter.get('/', findAll)
membershipTypeRouter.get('/:id', findOne)