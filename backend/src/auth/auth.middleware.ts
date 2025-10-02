import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' //libreria para variables de entorno

dotenv.config()

interface UserPayload {
    id: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export async function verifyCookie(req:Request, res:Response,next:NextFunction){
    const jwtSecret = process.env.JWT_SECRET || 'clave_por_defecto_solo_desarrollo';
    
    const cookie = req.cookies.accessToken;
    if (!cookie){
        return res.status(401).json({ error: 'No token' });
    }
    try{
        const user = jwt.verify(cookie,jwtSecret) as UserPayload //verifica si esta bien firmado y devuelve un objeto con el payload decodificado
        //si falla lanza una excepcion
        
        req.user = user;
        
        next();
    }
    catch(error){
        res.status(401).json({ error: 'Invalid token' });
    }
}

export async function isAdmin(req:Request, res:Response, next:NextFunction){
    if(req.user?.role === 'admin')
        next();
    else return res.status(403).json({ error: 'No autorizado' });
    
}
