import { Router } from 'express'
import { findAll } from './room.controler.js'

export const roomRouter = Router()

roomRouter.get('/', findAll)