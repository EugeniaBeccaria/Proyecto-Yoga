import {Request, Response, NextFunction} from 'express';
import { orm } from '../shared/DB/orm.js';
import { User } from '../user/user.entity.js';
import { findOne } from '../taller/taller.controler.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv' //libreria para variables de entorno

dotenv.config()

const em = orm.em

async function register(req:Request,res:Response){
    console.log(req.body)

}


async function login(req:Request,res:Response){
    try{
        // console.log(req.body)
        const email = req.body.email
        const password = req.body.password
        if(!email || !password) 
            return res.status(400).json({status:'Error',message:'Campos incompletos'})

        //Validar existencia de email
        const userValidation = await em.findOne(User,{email:email})
        if (!userValidation)
            return res.status(404).json({status:'Error',message:'Error durante login'})
        console.log(userValidation)
        
        //hashea la password plana y la compara con la password hasheada (y sin la sal) almacenada en la bd
        const correctLogin = await bcryptjs.compare(password,userValidation.password)
        if(!correctLogin) 
            return res.status(404).json({status:'Error',message:'Error durante login'})

        //generar jsw
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET no está definido en las variables de entorno');
        }
        const token = jwt.sign(
            { id:userValidation.id, email:userValidation.email },
            jwtSecret,
            { expiresIn: (process.env.JWT_EXPIRATION || '2h') as jwt.SignOptions['expiresIn'] });
            const cookieOptions = process.env.JWT_COOKIE_EXPIRES || 1 * 24 * 60 * 60 *1000
    }
    catch(e){

    }    

}

export {register,login}