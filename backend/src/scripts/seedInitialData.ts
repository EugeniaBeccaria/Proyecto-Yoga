// src/scripts/seedInitialData.ts
import { error } from 'console';
import { orm } from '../shared/DB/orm.js'
import { User } from '../user/user.entity.js'
import { Room } from '../room/room.entity.js'
import bcryptjs, { genSalt, hash } from 'bcryptjs'


async function seedInitialData() {
    console.log(' Iniciando seeder...');
    
    const em = orm.em.fork() // la defini aca arriba y la saque del try del admin para poder usarla en todo el seeder

    // ================== USUARIO ADMIN ==================
    try {
        const existingAdmin = await em.findOne(User, { 
            email: 'admin@yoga.com'})
        if(!existingAdmin){
            const salt = await genSalt()
            const hashPassword = await bcryptjs.hash('admin123',salt)

            const userAdmin = em.create(User, {
                email:'admin@yoga.com',
                name:'administrador',
                password : hashPassword,
                role:'admin'
            })
        em.persistAndFlush(userAdmin)
        console.log('✅ Usuario admin creado exitosamente');
        
        }
        else throw error('Ya existe un admin')
    } catch (error) {
        console.error('Error:', error);
    }

    // ================== ROOMS ==================
    try {
        const existingRooms = await em.find(Room, {});
        if (existingRooms.length === 0) {
            const rooms = [
                em.create(Room, { name: "1" }),
                em.create(Room, { name: "2" }),
                em.create(Room, { name: "3" }),
            ];

            await em.persistAndFlush(rooms);
            console.log('✅ Rooms creados exitosamente');
        } else {
            console.log('⚠️ Ya existen rooms, no se cargaron de nuevo');
        }
    } catch (error) {
        console.error('❌ Error creando rooms:', error);
    }
}


seedInitialData();
export { seedInitialData }