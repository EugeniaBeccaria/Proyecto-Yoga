import {Request, Response, NextFunction} from 'express';
import { orm } from '../shared/DB/orm.js';
import { User } from '../user/user.entity.js';
import { findOne } from '../taller/taller.controler.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv' //libreria para variables de entorno
import { redirect } from 'react-router-dom';

dotenv.config()

const em = orm.em

async function login(req:Request,res:Response, next:NextFunction){
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
        const jwtSecret = process.env.JWT_SECRET || 'clave_por_defecto_solo_desarrollo';
        if (!jwtSecret) {
            throw new Error('JWT_SECRET no está definido en las variables de entorno');
        }
        const token = jwt.sign(
            { id:userValidation.id, email:userValidation.email, role:userValidation.role },
            jwtSecret,
            { expiresIn: '2h'});
            
        res.cookie('accessToken',token,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 día
            path: '/'
        })

        res.json({
            success: true,
            user: {
                id: userValidation.id,
                email: userValidation.email,
                role: userValidation.role,
                name: userValidation.name
            }
    });
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:'Error en el servidor'})
    }    

}

export {login}