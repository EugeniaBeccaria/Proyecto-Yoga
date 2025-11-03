import { orm } from '../shared/DB/orm.js';
import { User } from '../user/user.entity.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const em = orm.em;

// clase de error personalizada, hereda todo de la clase error, recibe un mensaje como parámetro
export class AuthError extends Error {
    constructor(message: string) {
    super(message);
    this.name = 'AuthError';
    }
}
async function login(email:string,password:string){
    if(!email || !password) 
        throw new AuthError('Campos incompletos');

    const userValidation = await em.findOne(User,{email:email})
    if (!userValidation)
        throw new AuthError('Error durante login');

    const correctLogin = await bcrypt.compare(password,userValidation.password)
    if(!correctLogin) 
        throw new AuthError('Error durante login');

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }

    const refreshJwtSecret = process.env.REFRESH_JWT_SECRET 
    if(!refreshJwtSecret)
        throw new Error('REFRESH_JWT_SECRET no está definido en las variables de entorno');

    const userPayload = {id:userValidation.id, email:userValidation.email, role:userValidation.role};

    const refreshToken = jwt.sign(userPayload,refreshJwtSecret,{expiresIn: '7d'})
    const token = jwt.sign(userPayload,jwtSecret,{ expiresIn: '1h'});

    return { token, refreshToken, user: userValidation };
}

export const authService = {
    login
};