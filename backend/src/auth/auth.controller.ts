import {Request, Response, NextFunction} from 'express';
import { AuthError,authService } from './auth.service.js';

async function login(req:Request,res:Response, next:NextFunction){
    try{
        const email = req.body.email
        const password = req.body.password

        const loginData = await authService.login(email,password)
        const { token, refreshToken, user: userValidation } = loginData;

         // Configurar las cookies
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
            secure: process.env.NODE_ENV === 'production'
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
            secure: process.env.NODE_ENV === 'production'
        })

        res.json({success: true, 
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
        if(e instanceof AuthError){
            return res.status(401).json({message: e.message})
        }
        else {
            res.status(500).json({message:'Error en el servidor'})
        }
    }
}

async function loginWithGoogle(req: Request, res: Response, next: NextFunction) {
    try {
        const { code } = req.body; 
        const loginData = await authService.loginWithGoogle(code);
        const { token, refreshToken, user: userValidation } = loginData;

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
            secure: process.env.NODE_ENV === 'production'
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
            secure: process.env.NODE_ENV === 'production'
        })

        res.json({
            success: true,
            user: {
                id: userValidation.id,
                email: userValidation.email,
                role: userValidation.role,
                name: userValidation.name,
            }
        });

    } catch (e) {
        console.log(e)
        if (e instanceof AuthError) {
            return res.status(401).json({ message: e.message })
        }
        else {
            res.status(500).json({ message: 'Error en el servidor' })
        }
    }
}

async function logout(req:Request,res:Response){
    try{
        // Opciones consistentes
        const cookieOptions = {
            httpOnly: true,
            sameSite: 'lax' as const,
            path: '/',
            secure: process.env.NODE_ENV === 'production'
        };

        res.clearCookie('token', cookieOptions);
        res.clearCookie('refreshToken', cookieOptions);
        
        res.status(200).json({success:true,message:'Sesión cerrada'})
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:'Error en el servidor'})
    }
}

export {login,logout, loginWithGoogle}