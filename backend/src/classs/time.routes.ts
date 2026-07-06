import {Router} from 'express'
import { findAll, findOne } from './time.controler.js'

export const timeRouter = Router()

timeRouter.get('/', findAll)
timeRouter.get('/:id', findOne)