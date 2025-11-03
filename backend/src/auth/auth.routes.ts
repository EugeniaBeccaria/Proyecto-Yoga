import express from 'express'
import {login, logout} from './auth.controller.js'
import { isAdmin, verifyCookie,isProfessor } from '../auth/auth.middleware.js'
import { check } from 'express-validator'
import verifyResult from '../validation/validation.middleware.js'

export const authRouter = express.Router()

authRouter.post('/login',[
    check('email','Email inválido').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty()
    ],
verifyResult, login)

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
