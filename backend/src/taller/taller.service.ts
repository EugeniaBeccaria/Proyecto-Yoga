import { Taller } from './taller.entity.js'
import { Room } from '../room/room.entity.js' 
import { Day } from '../classs/day.entity.js' 
import { Time } from '../classs/time.entity.js'
import { orm } from '../shared/DB/orm.js'
import { User } from '../user/user.entity.js'

const em = orm.em
// Servicio para manejar la lógica de negocio relacionada con Talleres
export class tallerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "tallerError";
    }
}

async function add(name: string, description: string, cupo: number, datetime: string, room: number, price: number, profesor: number) {

    const roomEntity = await em.findOne(Room, { id: room });
    const professorEntity = await em.findOne(User, { id: profesor });

    if (!roomEntity || !professorEntity) {
        throw new Error('Invalid foreign key references');
    }

    const existingTaller = await em.findOne(Taller, { datetime, room: roomEntity });
    if (existingTaller) {
        throw new tallerError('Ya existe un taller en la misma fecha y sala');
    }

    const professorConflict = await em.findOne(Taller, { datetime, professor: professorEntity });
    if (professorConflict) {
        throw new tallerError('El profesor ya tiene un taller asignado en esa fecha y hora');
    }
    
    const taller = em.create(Taller, {
        name:name,
        description:description,
        cupo:cupo,
        datetime:datetime,
        room:roomEntity,
        price:price,
        professor:professorEntity
    })
    await em.persistAndFlush(taller);
    return taller;
}

export const tallerService = {
    add
};