import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { Classs } from './classs.entity.js' 
import { User } from '../user/user.entity.js'
import { Room } from '../room/room.entity.js'
import { Day } from './day.entity.js'
import { Time } from './time.entity.js'


const em = orm.em

function sanitizeClasssInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    capacityLimit: req.body.capacityLimit
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

interface ClassInput {
  name: string;
  description: string;
  capacityLimit: number;
  day: number;
  time: number;
  room: number; 
  professor: number;
}

async function findAll(req: Request, res: Response) {
  try {
    const classes = await em.find(Classs, {}, { populate: ['day', 'time', 'room'] }) //populate indica a MikroORM que haga joins con las tablas relacionadas
    res.status(200).json({ message: 'found all classes', data: classes })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const classs = await em.findOneOrFail(Classs, { id }, { populate: ['day', 'time', 'room'] })
    res.status(200).json({ message: 'found class', data: classs })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    console.log("Cuerpo de la solicitud:", req.body.classData);
    const {
            name, 
            description,
            capacityLimit,
            day, 
            time, 
            room, 
            professor
        } = req.body.classData as ClassInput; 

    if (!name || !description || !day || !time || !room || !professor || !capacityLimit) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const roomEntity = await em.findOne(Room, { id: room });
    const dayEntity = await em.findOne(Day, { id: day });
    const timeEntity = await em.findOne(Time, { id: time });
    const professorEntity = await em.findOne(User, { id: professor, role: 'professor' });

    if (!roomEntity || !dayEntity || !timeEntity || !professorEntity) {
      return res.status(404).json({ message: 'Invalid foreign key references' });
    }

    // const roomRef = em.getReference(Room, room);
    // const dayRef = em.getReference(Day, day);
    // const timeRef = em.getReference(Time, time);
    // const professorRef = em.getReference(User, professor);

    // getReference crea un marcador de posición si no encuentra la entidad con el mismo id, esto puede causar errores con la CF
    console.log("Creating class with data:", {
      name, 
      description,
      capacityLimit,
      dayEntity,
      timeEntity,
      roomEntity,
      professorEntity
    });

    
    const existingClass = await em.findOne(Classs, {day: dayEntity, time: timeEntity, room: roomEntity });
    if (existingClass) {
      return res.status(409).json({ message: 'Class with the same day, time, and room already exists' });
    }


    const classs = em.create(Classs, {
      name: name,
      description: description,
      capacityLimit: capacityLimit,
      users: [],
      professor: professorEntity,
      room: roomEntity,
      day: dayEntity,
      time: timeEntity,
    })
    //posteriormente se usara add() para agregar alumnos a la clase

    await em.persistAndFlush(classs)

    res.status(201).json({ message: 'class created', data: classs })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const classsToUpdate = await em.findOneOrFail(Classs, { id })
    em.assign(classsToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'class updated', data: classsToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const classs = em.getReference(Classs, id)
    await em.removeAndFlush(classs)
    res.status(200).send({ message: 'class deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


async function findClassesByProfessorId(req: Request, res: Response) {
  try {
    const professorId = Number(req.user?.id);

    if (!professorId) {
      return res.status(400).json({ message: 'ID del profesor no encontrado en el token' });
    }

    const classes = await orm.em.find(Classs, { professor: professorId }, 
      { populate: ['day', 'time', 'room', 'users'] });

    // Devolvemos siempre un 200 OK con la estructura de "sobre",
    // incluso si la lista de clases está vacía.
    res.status(200).json({ message: 'Clases del profesor encontradas', data: classes });

  } catch (error: any) {
    console.error('Error al obtener clases del profesor:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export {sanitizeClasssInput, findAll, findOne, add, update, remove, findClassesByProfessorId}