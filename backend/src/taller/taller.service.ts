import { Taller } from './taller.entity.js'
import { Room } from '../room/room.entity.js' 
import { Day } from '../classs/day.entity.js' 
import { Time } from '../classs/time.entity.js'
import { orm } from '../shared/DB/orm.js'
import { User } from '../user/user.entity.js'

const em = orm.em.fork();

export class tallerError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = "tallerError";
    }
}

async function findAll() {
    return await em.find(Taller, {}, { populate: ['users', 'time', 'room', 'professor'] });
}

async function findOne(id: string) {
    return await em.findOneOrFail(Taller, { id }, { populate: ['users', 'time', 'room', 'professor'] });
}

async function add(name: string, description: string, cupo: number, dateStr: string, room: string, price: number, profesor: string, timeId: string) {
    if (!dateStr) {
        throw new tallerError('La fecha es obligatoria', 400);
    }

    const [year, month, day] = dateStr.split("-").map(Number);
    if (!year || !month || !day) {
        throw new tallerError('La fecha proporcionada no es válida', 400);
    }

    const dateObj = new Date(year, month - 1, day);
    if (Number.isNaN(dateObj.getTime())) {
        throw new tallerError('La fecha proporcionada no es válida', 400);
    }

    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek !== 6) {
        throw new tallerError('Los talleres solo pueden programarse los días sábado.', 400);
    }

    const roomEntity = await em.findOne(Room, { id: room });
    const professorEntity = await em.findOne(User, { id: profesor });
    const timeEntity = await em.findOne(Time, { id: timeId });

    if (!roomEntity || !professorEntity || !timeEntity) {
        throw new tallerError('Invalid foreign key references', 404);
    }

    const existingTaller = await em.findOne(Taller, { datetime: dateStr, room: roomEntity, time: timeEntity });
    if (existingTaller) {
        throw new tallerError('Ya existe un taller en el mismo horario y sala', 409);
    }

    const professorConflict = await em.findOne(Taller, { datetime: dateStr, professor: professorEntity, time: timeEntity });
    if (professorConflict) {
        throw new tallerError('El profesor ya tiene un taller asignado en esa fecha y hora', 409);
    }

    const taller = em.create(Taller, {
        name: name,
        description: description,
        cupo: cupo,
        datetime: dateStr,
        room: roomEntity,
        price: price,
        professor: professorEntity,
        time: timeEntity
    });
    em.persist(taller);
    await em.flush();

    return taller;
}

async function update(id: string, input: any) {
    const tallerToUpdate = await em.findOneOrFail(Taller, { id });

    const sanitizedInput: any = {};
    if (input.name !== undefined) sanitizedInput.name = input.name;
    if (input.description !== undefined) sanitizedInput.description = input.description;
    if (input.cupo !== undefined) sanitizedInput.cupo = input.cupo;
    if (input.date !== undefined) sanitizedInput.datetime = input.date;
    if (input.datetime !== undefined) sanitizedInput.datetime = input.datetime;
    if (input.price !== undefined) sanitizedInput.price = input.price;

    em.assign(tallerToUpdate, sanitizedInput);
    await em.flush();
    return tallerToUpdate;
}

async function remove(id: string) {
    const taller = em.getReference(Taller, id);
    await em.removeAndFlush(taller);
}

async function findTalleresByProfessorId(professorId: string) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    return await em.find(Taller, { 
      professor: professorId,
      datetime: { $gte: todayStr }
    }, { populate: ['time', 'room', 'users'] });
}

export const tallerService = {
    findAll,
    findOne,
    add,
    update,
    remove,
    findTalleresByProfessorId
};
