import {Router} from 'express'
import { findAll, findOne, add, update, remove, findOneByUserId, findOneBySessionId } from './membership.controler.js'

export const membershipRouter = Router()

membershipRouter.get('/', findAll)
membershipRouter.get('/:id', findOne)
membershipRouter.get('/user/:userId', findOneByUserId)
membershipRouter.get('/session/:sessionId', findOneBySessionId)

membershipRouter.post('/', add)
membershipRouter.put('/:id', update )
membershipRouter.delete('/:id', remove)