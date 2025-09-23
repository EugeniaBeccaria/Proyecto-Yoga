import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' //libreria para variables de entorno

dotenv.config()

export async function verifyCookie(req:Request, res:Response,next:NextFunction){
    try{
        const jwtSecret = process.env.JWT_SECRET || 'clave_por_defecto_solo_desarrollo';

        const cookie = req.cookies.accessToken;
        if (!cookie){
            return res.status(401).json({ error: 'No token' });
        }
        const user = jwt.verify(cookie,jwtSecret) //verifica si esta bien firmado y devuelve un objeto con el payload decodificado
        //si falla lanza una excepcion
        next();
    }
    catch(error){
        res.status(401).json({ error: 'Invalid token' });
    }
}

export async function isAdmin(req:Request, res:Response){
    // if(user.role !== 'admin')
}
