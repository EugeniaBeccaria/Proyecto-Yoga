import {Router} from 'express'
import { findAll, sanitizeRoomInput, findOne, add, update, remove } from './room.controler.js'
export const roomRouter = Router()

roomRouter.get('/', findAll)
roomRouter.get('/:id', findOne)
roomRouter.post('/', sanitizeRoomInput, add)
roomRouter.put('/:id', sanitizeRoomInput, update )
roomRouter.delete('/:id', sanitizeRoomInput, remove)