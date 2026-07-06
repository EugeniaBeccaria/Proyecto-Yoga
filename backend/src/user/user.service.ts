import { User } from "./user.entity.js";
import bcrypt, { genSalt } from "bcrypt";
import { orm } from "../shared/DB/orm.js";
import { Membership } from "../membership/membership.entity.js";

const em = orm.em.fork();

export class UserError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'UserError';
  }
}

async function register(name: string, lastname: string, email: string, phone: string, dni: string, password: string, role?: string){
    const existingUser = await em.findOne(User, { email });
    if (existingUser) {
        throw new UserError('El email ya está registrado.', 409);
    }

    const salt = await genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = em.create(User, {
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        dni: dni,
        role: role,
        password: hashPassword
    });
    em.persist(user);
    await em.flush();

    return user;
}

async function findAll(role?: string) {
    const filterParameters: any = {};
    if (role) {
        filterParameters.role = role;
    }
    return await em.find(User, filterParameters, { populate: ['talleres', 'classes', 'taughtClasses.day', 'taughtClasses.time', 'taughtClasses.room'] });
}

async function findMe(id: string) {
    return await em.findOneOrFail(User, { id });
}

async function update(id: string, inputData: any) {
    const userToUpdate = await em.findOneOrFail(User, { id });
    const { name, lastname, birthdate, email, phone, dni } = inputData;
    if(name) userToUpdate.name = name;
    if(lastname) userToUpdate.lastname = lastname;
    if(birthdate) userToUpdate.birthdate = birthdate;
    if(email) userToUpdate.email = email;
    if(phone) userToUpdate.phone = phone;
    if(dni) userToUpdate.dni = dni;
    
    await em.flush();
    return userToUpdate;
}

async function changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await em.findOneOrFail(User, { id: userId });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new UserError('Contraseña actual incorrecta', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await em.persistAndFlush(user);
    return user;
}

async function getStudents() {
    const students = await em.find(User, { role: 'client' }, { populate: ['talleres', 'classes'] });
    const memberships = await em.find(Membership, {}, { populate: ['user', 'membershipType'] });

    const studentsWithMemberships = students.map((student) => {
        const membership = memberships.find((m) => m.user.id === student.id && m.status.toLowerCase() === 'active');

        return {
            ...student,
            membership: membership
                ? membership.membershipType.description
                : 'Sin membresía activa'
        };
    });

    return studentsWithMemberships;
}

export const userService = {
    register,
    findAll,
    findMe,
    update,
    changePassword,
    getStudents
};