import { orm } from '../shared/DB/orm.js';
import { User } from '../user/user.entity.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const em = orm.em;

// Creo una instancia del cliente de Google 
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage" 
);

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

async function loginWithGoogle(code: string) {
    if (!code) {
        throw new AuthError("El código de autorización de Google es requerido.");
    }

    try {
        const { tokens } = await googleClient.getToken(code);
        const idToken = tokens.id_token;

        if (!idToken) {
            throw new AuthError("No se pudo obtener el ID token de Google.");
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email || !payload.name) {
            throw new AuthError("No se pudo obtener la información del perfil de Google.");
        }

        const { email, name } = payload;
        const [firstName, ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.join(' ') || '';
        let user = await em.findOne(User, { email: email });

        if (!user) {
            console.log(`Usuario de Google no encontrado (${email}). Creando nuevo usuario...`);
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashPassword = await bcrypt.hash(randomPassword, 10);
            user = em.create(User, {
                name: firstName,
                lastname: lastName,
                email: email,
                role: 'client',
                password: hashPassword
            });
            await em.flush();
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET no está definido');
        }
        const refreshJwtSecret = process.env.REFRESH_JWT_SECRET
        if (!refreshJwtSecret)
            throw new Error('REFRESH_JWT_SECRET no está definido');

        const userPayload = { id: user.id, email: user.email, role: user.role };
        const refreshToken = jwt.sign(userPayload, refreshJwtSecret, { expiresIn: '7d' })
        const token = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });

        return { token, refreshToken, user: user };

    } catch (error) {
        console.error("Error en loginWithGoogle:", error);
        throw new AuthError("Error al autenticar con Google: " + (error as Error).message);
    }
}

export const authService = {
    login,
    loginWithGoogle
};