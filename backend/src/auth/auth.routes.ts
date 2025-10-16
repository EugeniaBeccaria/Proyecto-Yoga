import express from 'express'
import {login, logout} from './auth.controller.js'
import { isAdmin, verifyCookie,isProfessor } from '../auth/auth.middleware.js'

export const authRouter = express.Router()

authRouter.post('/login',login)
authRouter.post('/logout',logout)

authRouter.get('/authorized',verifyCookie, (req,res)=>{
    res.status(200).json({message: 'Autorizado'})
})
authRouter.get('/isAdmin',verifyCookie,isAdmin, (req,res)=>{
    res.status(200).json({message: 'Autorizado'})
})
authRouter.get('/isProfessor',verifyCookie,isProfessor, (req,res)=>{
    res.status(200).json({message: 'Autorizado'})
})
