import { User } from "../user/user.entity.js";
import { orm } from "../shared/DB/orm.js";

export async function verifyEmail(email: string){
    const exist = await orm.em.findOne(User,{email:email})
    if (exist) 
    throw new Error('Ya existe una cuenta con este email')
}