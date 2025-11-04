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
    const jwtSecret = process.env.JWT_SECRET;
    const refreshJwtSecret = process.env.REFRESH_JWT_SECRET

    if (!jwtSecret) {
        throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }

    if(!refreshJwtSecret)
        throw new Error('REFRESH_JWT_SECRET no está definido en las variables de entorno');

    const cookie = req.cookies.accessToken;
    const refreshCookie = req.cookies.refreshToken

    if (!cookie && !refreshCookie){
        return res.status(401).json({ error: 'No autorizado' });
    }
    try{
        if(!cookie && refreshCookie){
            //generar nuevo par de tokens
            console.log("Access token vencido, creamos un nuevo par de tokens")
            const userRefresh = jwt.verify(refreshCookie,refreshJwtSecret!) as UserPayload
                
            const refreshToken = jwt.sign(
                {id:userRefresh.id, email:userRefresh.email, role:userRefresh.role},
                refreshJwtSecret,
                {expiresIn: '7d'}
            )
            const token = jwt.sign(
                { id:userRefresh.id, email:userRefresh.email, role:userRefresh.role },
                jwtSecret,
                { expiresIn: '1h'});
                
            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                sameSite: 'strict',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000, //7dias
                secure:true            
            })
        
            res.cookie('accessToken',token,{
                httpOnly: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 1000, //1 hora
                secure:true
            })
            req.user = userRefresh;
            return next();
        }
    
        const user = jwt.verify(cookie,jwtSecret!) as UserPayload //verifica si esta bien firmado y devuelve un objeto con el payload decodificado
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

export async function isProfessor(req:Request, res:Response, next:NextFunction){
    if(req.user?.role === 'professor')
        next();
    else return res.status(403).json({ error: 'No autorizado' });
    
}
