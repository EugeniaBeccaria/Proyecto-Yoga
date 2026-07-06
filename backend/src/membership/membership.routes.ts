import { Router } from 'express'
import { findOneByUserId, findOneBySessionId } from './membership.controler.js'

export const membershipRouter = Router()

membershipRouter.get('/user/:userId', findOneByUserId)
membershipRouter.get('/session/:sessionId', findOneBySessionId)