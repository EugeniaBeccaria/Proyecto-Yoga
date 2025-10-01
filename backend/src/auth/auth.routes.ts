import express from 'express'
import {login, logout} from './auth.controller.js'
import { isAdmin, verifyCookie } from '../auth/auth.middleware.js'

export const authRouter = express.Router()

authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.post('/authorized',verifyCookie,isAdmin)
