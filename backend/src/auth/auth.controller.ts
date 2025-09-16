import {Request, Response, NextFunction} from 'express'
import bcryptjs from 'bcryptjs'

async function register(req:Request,res:Response){
    console.log(req.body)

}


async function login(req:Request,res:Response){
    const user = req.body.name
    const email = req.body.email
    const password = req.body.name
    if(!user || !email || !password) 
        res.status(400).json({status:'Error',message:'Campos incompletos'})
    console.log(req.body)
}

export {register,login}