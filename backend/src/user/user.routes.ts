import {Router} from 'express'
import { findAll, findOne, add, update, remove } from './user.controler.js'
import { verifyCookie } from '../auth/auth.middleware.js'

export const userRouter = Router()

userRouter.get('/',verifyCookie ,findAll)
userRouter.get('/:id', verifyCookie, findOne)
userRouter.post('/', add)
userRouter.put('/:id', verifyCookie, update )
userRouter.delete('/:id', verifyCookie, remove)
