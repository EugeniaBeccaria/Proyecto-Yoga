import {Request, Response, NextFunction} from 'express'
import bcryptjs from 'bcryptjs'

async function register(req:Request,res:Response){
    console.log(req.body)
    const user = req.body.name
    const email = req.body.email
    const password = req.body.name

    if(!user || !email || !password) 
        res.status(400).json({status:'Error',message:'Campos incompletos'})

    // res.status(201).json({ 
    // message: 'Usuario registrado exitosamente',
    // user: user })
    
    // validacion para que no existan usuarios iguales
    
    const salt = await bcryptjs.genSalt()
    const hashPassword = await bcryptjs.hash(password,salt)
}


async function login(req:Request,res:Response){
    console.log(req.body)
}

export {register,login}