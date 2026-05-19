import { Taller } from './taller.entity.js'
import { Room } from '../room/room.entity.js' 
import { Day } from '../classs/day.entity.js' 
import { Time } from '../classs/time.entity.js'
import { orm } from '../shared/DB/orm.js'
import { User } from '../user/user.entity.js'
import Stripe from 'stripe'

const em = orm.em
// Servicio para manejar la lógica de negocio relacionada con Talleres
export class tallerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "tallerError";
    }
}

async function add(name: string, description: string, cupo: number, datetime: string, room: string, price: number, profesor: string, timeId: string) {

    const roomEntity = await em.findOne(Room, { id: room });
    const professorEntity = await em.findOne(User, { id: profesor });
    const timeEntity = await em.findOne(Time, { id: timeId });

    if (!roomEntity || !professorEntity || !timeEntity) {
        throw new Error('Invalid foreign key references');
    }

    const existingTaller = await em.findOne(Taller, { datetime, room: roomEntity, time: timeEntity });
    if (existingTaller) {
        throw new tallerError('Ya existe un taller en el mismo horario y sala');
    }

    const professorConflict = await em.findOne(Taller, { datetime, professor: professorEntity, time: timeEntity });
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
        professor:professorEntity,
        time:timeEntity
    })
    em.persist(taller)
    await em.flush()

    return taller;
}

async function handleCheckoutSessionCompletedTalleres(session: Stripe.Checkout.Session) {
    const em = orm.em.fork(); // create a new EntityManager instance
    
    try {
        const metadata = session.metadata;
        if (!metadata || !metadata.userId || !metadata.talleres) {
            throw new Error('No metadata found in the session.');
        }
        const userId = metadata.userId;
        const idTalleres = JSON.parse(metadata.talleres);

        const user = await em.findOne(User, { id: userId });
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        const talleres = await em.find(Taller, { id: { $in: idTalleres as string[] } }, { populate: ['users'] });
        if (!talleres || talleres.length === 0) {
            throw new Error('No se encontraron los talleres para asignar al usuario.');
        }

        talleres.forEach((taller) => {
            if (taller.users.contains(user)) {
                throw new tallerError(`El usuario ya está inscripto en el taller ${taller.name}.`);
            }
            const enrolledCount = taller.users.length;
            if (enrolledCount >= taller.cupo) {
                throw new tallerError(`El taller ${taller.name} no tiene cupos disponibles.`);
            }

            taller.users.add(user);
        });

        await em.flush();
        return { talleres, user };
    } catch (error) {
        console.error('Error handling checkout session completed for talleres:', error);
        throw error;
    }
}

export const tallerService = {
    add,
    handleCheckoutSessionCompletedTalleres
};
