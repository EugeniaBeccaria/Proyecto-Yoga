import {Router} from 'express'
import { findAll, sanitizeTallerInput, findOne, add, update, remove } from './taller.controler.js'

export const tallerRouter = Router()

tallerRouter.get('/', findAll)
tallerRouter.get('/:id', findOne)
tallerRouter.post('/', sanitizeTallerInput, add)
tallerRouter.put('/:id', sanitizeTallerInput, update )
tallerRouter.patch('/:id', sanitizeTallerInput, update )
tallerRouter.delete('/:id', sanitizeTallerInput, remove)