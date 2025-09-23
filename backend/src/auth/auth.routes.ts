import express from 'express'
import {login} from './auth.controller.js'
import { isAdmin, verifyCookie } from '../auth/auth.middleware.js'

export const authRouter = express.Router()

authRouter.post('/login',login)

authRouter.post('/authorized',verifyCookie,isAdmin)
