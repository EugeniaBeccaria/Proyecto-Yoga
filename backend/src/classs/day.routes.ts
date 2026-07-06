import {Router} from 'express'
import { findAll, findOne } from './day.controler.js'

export const dayRouter = Router()

dayRouter.get('/', findAll)
dayRouter.get('/:id', findOne)