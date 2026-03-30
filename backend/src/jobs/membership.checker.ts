import nodeCron from "node-cron";
import { Membership } from '../membership/membership.entity.js'
import { orm } from "../shared/DB/orm.js";

export const membershipChecker = () => {
    nodeCron.schedule('0 0 * * *', async () => { 
        try {
            const em = orm.em.fork();
            const today = new Date();
            const toExpire = await em.find(Membership, 
                { endDate: { $lt: today }, status: 'active' },
                { populate: ['user.classes.users'] as any } 
            );
            //user --> trae al objeto usuario asociado a la membresía
            //.classes --> mira en la tabla intermedia cuáles son los ids de las clases donde ese usuario está anotado y trae los objetos classs
            //.users --> es necesario traer a todos los alumnos de las clases para que mikro pueda hacer el remove

            if (toExpire.length > 0) {
                for (const m of toExpire) { 
                    const user = m.user;
                    const enrolledClasses = user.classes.getItems();

                    for (const c of enrolledClasses) { // por cada clase a la que el usuario está inscrito
                        c.users.remove(user);
                        c.enrolledCount = Math.max((c.enrolledCount || 0) - 1, 0);
                    }
                    m.status = 'expired';
                    console.log(`Membresía con ID ${m.id} ha expirado. Usuario ${user.name} removido de sus clases.`);
                }
                await em.flush();
            }
        else {
            console.log("Sin membresias expiradas")
        }
        }
        catch (error) {
            console.error('Error al verificar membresías:', error);
        }
    });
}
// ejemplo en json de lo que guarda toExpire:
    // [
    //   {
    //     "id": 500,
    //     "status": "active",
    //     "endDate": "2026-03-29T23:59:59Z",
    //     "user": {
    //       "id": 1,
    //       "name": "Manuc",
    //       "email": "manuc@mail.com",
    //       "classes": [
    //         {
    //           "id": 10,
    //           "name": "Yoga Ashitanga",
    //           "enrolledCount": 15,
    //           "users": [
    //             { "id": 1, "name": "Manuc" }, 
    //             { "id": 8, "name": "Laura" },
    //             { "id": 15, "name": "Pedro" }
    //           ]
    //         },
    //         {
    //           "id": 12,
    //           "name": "Meditación",
    //           "enrolledCount": 5,
    //           "users": [
    //             { "id": 1, "name": "Manuc" },
    //             { "id": 22, "name": "Santi" }
    //           ]
    //         }
    //       ]
    //     }
    //   }
    // ]