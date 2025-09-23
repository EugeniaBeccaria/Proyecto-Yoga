// src/scripts/seedInitialData.ts
import { error } from 'console';
import { orm } from '../shared/DB/orm.js'
import { User } from '../user/user.entity.js'
import bcryptjs, { genSalt, hash } from 'bcryptjs'


async function seedInitialData() {
    console.log(' Iniciando seeder...');
    
    try {
        const em = orm.em.fork()
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
}

seedInitialData();