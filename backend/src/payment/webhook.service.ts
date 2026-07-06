import Stripe from 'stripe';
import { orm } from '../shared/DB/orm.js';
import { Membership } from '../membership/membership.entity.js';
import { User } from '../user/user.entity.js';
import { MembershipType } from '../membership/membershipType.entity.js';
import { Classs } from '../classs/classs.entity.js';
import { Taller } from '../taller/taller.entity.js';
import { tallerError } from '../taller/taller.service.js';

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const em = orm.em.fork();

    try {
        const metadata = session.metadata;
        if (!metadata || !metadata.userId || !metadata.plan || !metadata.classes) {
            throw new Error('No metadata found in the session.');
        }
        const userId = metadata.userId;
        const numOfClasses = metadata.plan;
        const idClasses = JSON.parse(metadata.classes);
        const idSession = session.id;

        const classEntities = await em.find(Classs, { id: { $in: idClasses as string[] } });
        const user = await em.findOne(User, { id: userId });
        const membershipType = await em.findOne(MembershipType, { numOfClasses: parseInt(numOfClasses) });
        console.log('User found:', user);

        if (!user || !membershipType) {
            throw new Error(`User with ID ${userId} not found or MembershipType with numOfClasses ${numOfClasses} not found.`);
        }

        const today = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() - 1);
        endDate.setDate(endDate.getDate() + 1);

        const membership = new Membership();
        membership.startDate = today;
        membership.endDate = endDate;
        membership.status = 'active';
        membership.user = user;
        membership.membershipType = membershipType;
        membership.stripeSessionId = idSession;
        em.persist(membership);

        if (!classEntities || classEntities.length === 0) {
            throw new Error('No se encontraron las clases para asignar a la membresía.');
        }
        
        classEntities.forEach((classs: Classs) => {
            user.classes.add(classs);
            classs.enrolledCount = (classs.enrolledCount || 0) + 1;
        });

        console.log('...............', classEntities);
        await em.flush();
        return { membership, user };
    }
    catch (error) {
        console.error("Error activando la membresía:", error);
        throw error;
    }
}

async function handleCheckoutSessionCompletedTalleres(session: Stripe.Checkout.Session) {
    const em = orm.em.fork();
    
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

async function processWebhook(rawBody: any, signature: string, secretKey: string) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY!, { apiVersion: '2025-10-29.clover' });
    const event = stripe.webhooks.constructEvent(rawBody, signature, secretKey);

    switch (event.type) {
        case 'checkout.session.completed':
            console.log(`---------------------------------Evento recibido: ${event.type}`);
            const session = event.data.object as Stripe.Checkout.Session;
            if (session.metadata?.plan && session.metadata?.classes) {
                const dataWebhook = await handleCheckoutSessionCompleted(session);
                console.log(`Membresía creada para el usuario ${dataWebhook.user.email} con tipo de membresía: ${dataWebhook.membership.membershipType.description}.`);
                break;
            }
            if (session.metadata?.talleres) {
                console.log(session.metadata);
                console.log('Checkout de talleres completado. Pendiente de procesamiento posterior.');
                const dataWebhookTalleres = await handleCheckoutSessionCompletedTalleres(session);
                break;
            }
            console.log('Checkout completado sin metadata esperada.');
            break;
        case 'checkout.session.expired':
            console.log('La sesión de pago expiró sin completarse.');
            break;
        default:
            console.log(`Evento no manejado: ${event.type}`);
    }
}

export const webhookService = {
    handleCheckoutSessionCompleted,
    handleCheckoutSessionCompletedTalleres,
    processWebhook
};
