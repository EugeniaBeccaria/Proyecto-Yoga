import express from 'express'
import {login, register} from './auth.controller.js'

export const authRouter = express.Router()

authRouter.post('/login',(req,res)=>{login})
authRouter.post('/register',(req,res)=>{register})

