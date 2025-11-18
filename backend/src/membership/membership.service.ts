import Stripe from 'stripe';
import { orm } from '../shared/DB/orm.js';
import { Membership } from '../membership/membership.entity.js';
import { User } from '../user/user.entity.js';
import { MembershipType } from '../membership/membershipType.entity.js';
import { Classs } from '../classs/classs.entity.js';

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const em = orm.em.fork(); // create a new EntityManager instance

    try {
        const metadata = session.metadata;
        if (!metadata || !metadata.userId || !metadata.plan || !metadata.classes) {
            throw new Error('No metadata found in the session.');
        }
        const userId = metadata.userId;
        const numOfClasses = metadata.plan;
        const idClasses = JSON.parse(metadata.classes);

        const classEntities = await em.find(Classs, { id: { $in: idClasses.map((id: number) => id) } });
        const user = await em.findOne(User , { id: parseInt(userId) });
        const membershipType = await em.findOne(MembershipType, { numOfClasses: parseInt(numOfClasses) });

        if (!user || !membershipType) {
            throw new Error(`User with ID ${userId} not found or MembershipType with numOfClasses ${numOfClasses} not found.`);
        }
        
        const today = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        
        const membership = new Membership();
        membership.startDate = today;
        membership.endDate = endDate;
        membership.status = 'active';
        membership.user = user;
        membership.membershipType = membershipType;
        em.persist(membership);
        
        if(!classEntities || classEntities.length === 0){
            throw new Error('No se encontraron las clases para asignar a la membresía.');
        }
        //agregar al usuario a cada clase y aumentar el contador de alumnos en cada clase segun las metadata de la sesion
        classEntities.forEach((classs: Classs) => {
            user.classes.add(classs);
            classs.enrolledCount = (classs.enrolledCount || 0) + 1;
        })
        
        console.log('...............',classEntities)
        // Guardar los cambios en la bd para manejar todo como una transaccion
        await em.flush();
        return { membership, user };
        } 
    catch (error) {
        console.error("Error activando la membresía:", error);
        throw error;
        }
}

export const membershipService = {
    handleCheckoutSessionCompleted,
};