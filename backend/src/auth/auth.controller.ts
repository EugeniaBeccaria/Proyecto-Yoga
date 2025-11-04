import {Request, Response, NextFunction} from 'express';
import { AuthError,authService } from './auth.service.js';

async function login(req:Request,res:Response, next:NextFunction){
    try{
        const email = req.body.email
        const password = req.body.password

        const loginData = await authService.login(email,password)
        const { token, refreshToken, user: userValidation } = loginData;

         // Configurar las cookies        
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            sameSite: 'strict',
            path: '/',
            maxAge: 1 * 24 * 60 * 60 * 1000, //1 dia
            secure:true            
        })

        res.cookie('accessToken',token,{
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 1000, //1 hora
            secure:true
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

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 1 * 24 * 60 * 60 * 1000, //1 dia
            secure: true
        })

        res.cookie('accessToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 1000, //1 hora
            secure: true
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

        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        });
        
        res.status(200).json({success:true,message:'Sesión cerrada'})
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:'Error en el servidor'})
    }
}

export {login,logout, loginWithGoogle}