import { orm } from '../shared/DB/orm.js';
import { User } from '../user/user.entity.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const em = orm.em;

// crea una instancia del cliente de Google 
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
    if (!userValidation || !userValidation.password)
        throw new AuthError('Error durante login');

    const correctLogin = await bcrypt.compare(password,userValidation.password!)
    if(!correctLogin) 
        throw new AuthError('Error durante login');

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }

    const refreshJwtSecret = process.env.REFRESH_JWT_SECRET 
    if(!refreshJwtSecret)
        throw new Error('REFRESH_JWT_SECRET no está definido en las variables de entorno');

    const userPayload = {id:userValidation.id, email:userValidation.email, role:userValidation.role, name: userValidation.name}; // agregué name

    const refreshToken = jwt.sign(userPayload,refreshJwtSecret,{expiresIn: '1d'})
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
        if (!payload || !payload.email || !payload.name || !payload.sub) {
            throw new AuthError("No se pudo obtener la información del perfil de Google.");
        }
        const { email, name, sub: googleId } = payload; // sub es el ID de Google

        const em = orm.em.fork(); 
        let user: User | null;
        user = await em.findOne(User, { googleId: googleId });
        if (user) {
            console.log(`Usuario encontrado por Google ID: ${user.email}`);
        } else {
            // usuario existe por Email?
            user = await em.findOne(User, { email: email });
            if (user) {
                console.log(`Usuario encontrado por email: ${email}. Vinculando Google ID...`);
                user.googleId = googleId;
                await em.flush();
            } else {
                // si es un usuario nuevo lo creo
                console.log(`Nuevo usuario de Google: ${email}. Creando...`);
                const [firstName, ...lastNameParts] = name.split(' ');
                const lastName = lastNameParts.join(' ') || '';
                user = em.create(User, {
                    name: firstName,
                    lastname: lastName,
                    email: email,
                    googleId: googleId, 
                    role: 'client'
                });
                await em.persistAndFlush(user);
            }
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET no está definido');
        }
        const refreshJwtSecret = process.env.REFRESH_JWT_SECRET
        if (!refreshJwtSecret)
            throw new Error('REFRESH_JWT_SECRET no está definido');

        const userPayload = { id: user.id, email: user.email, role: user.role, name: user.name };
        const refreshToken = jwt.sign(userPayload, refreshJwtSecret, { expiresIn: '1d' }) // lo cambié a un dia
        const token = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });

        return { token, refreshToken, user: user };

    } catch (error) {
        console.error("Error en loginWithGoogle:", error);
        if (error instanceof AuthError) {
            throw error;
        }
        throw new AuthError("Error al autenticar con Google: " + (error as Error).message);
    }
}

export const authService = {
    login,
    loginWithGoogle
};