// src/scripts/seedInitialData.ts
import { error } from 'console';
import { orm } from '../shared/DB/orm.js'
import { User } from '../user/user.entity.js'
import { Room } from '../room/room.entity.js'
import { Day } from '../classs/day.entity.js';
import { Time } from '../classs/time.entity.js';
import bcrypt, { genSalt, hash } from 'bcrypt'


async function seedInitialData() {
    console.log(' Iniciando seeder...');
    
    const em = orm.em.fork() // la defini aca arriba y la saque del try del admin para poder usarla en todo el seeder

    // ================== USUARIO ADMIN ==================
    try {
        const existingAdmin = await em.findOne(User, { 
            email: 'admin@yoga.com'})
        if(!existingAdmin){
            const salt = await genSalt()
            const hashPassword = await bcrypt.hash('admin123',salt)

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
    // ================== USUARIO PROFESSOR ==================
     try {
    const existingProfessor = await em.findOne(User, { email: 'profezarah@yoga.com' });
    if (!existingProfessor) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash('profe001', salt);

      const userProfessor = em.create(User, {
        email: 'profezarah@yoga.com',
        name: 'Zarah',
        password: hashPassword,
        role: 'professor',
      });

      await em.persistAndFlush(userProfessor);
      console.log(' Usuario profesor creado exitosamente');
    } else {
      console.log(' Ese profesor ya existe, se omite su creación.');
    }
  } catch (error) {
    console.error(' Error creando profesor:', error)}

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
            console.log('Rooms cretaed successfully');
        } else {
            console.log('Rooms already created, skipping..');
        }
    } catch (error) {
        console.error(' Rooms error:', error);
    }

    // ================== DAYS ==================
    const existingDays = await em.find(Day, {});
    if (existingDays.length === 0) {
        const days = [
        em.create(Day, { name: "Lunes" }),
        em.create(Day, { name: "Martes" }),
        em.create(Day, { name: "Miércoles" }),
        em.create(Day, { name: "Jueves" }),
        em.create(Day, { name: "Viernes" }),
        em.create(Day, { name: "Sábado" })
    ];
        await em.persistAndFlush(days);
        console.log("Days created successfully");
    } else {
        console.log("Days already created, skipping.");
    }

    // ================== TIME ==================
    const existingTimes = await em.find(Time, {});
    if (existingTimes.length === 0) {
        const days = [
        em.create(Time, {startTime: "07:00"}),
        em.create(Time, {startTime: "08:00"}),
        em.create(Time, {startTime: "09:00"}),
        em.create(Time, {startTime: "10:00"}),
        em.create(Time, {startTime: "11:00"}),
        em.create(Time, {startTime: "12:00"}),
        em.create(Time, {startTime: "13:00"}),
        em.create(Time, {startTime: "14:00"}),
        em.create(Time, {startTime: "15:00"}),
        em.create(Time, {startTime: "16:00"}),
        em.create(Time, {startTime: "17:00"}),
        em.create(Time, {startTime: "18:00"}),
        em.create(Time, {startTime: "19:00"}),
    ];
        await em.persistAndFlush(days);
        console.log("Times created successfully");
    } else {
        console.log("Times already created, skipping.");
    }
}

export { seedInitialData }
// seedInitialData();
