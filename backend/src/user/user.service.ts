import { User } from "./user.entity.js";
import bcrypt, { genSalt } from "bcrypt";
import { orm } from "../shared/DB/orm.js";

const em = orm.em;

async function register(name: string, lastname: string, email: string, phone: string, dni: string, password: string, role?: string){

    const salt = await genSalt()
    const hashPassword = await bcrypt.hash(password,salt)

    const user = em.create(User, {
    name: name,
    lastname: lastname,
    email: email,
    phone:phone,
    dni:dni,
    role: role,
    password: hashPassword
    });
    await em.persistAndFlush(user);

    return user;
}

export const userService = {
    register
};