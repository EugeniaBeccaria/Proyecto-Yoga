import {Request, Response, NextFunction} from 'express'
import { Taller } from './taller.entity.js'
import { orm } from '../shared/DB/orm.js'
import { Room } from '../room/room.entity.js' 
import { Day } from '../classs/day.entity.js' 
import { Time } from '../classs/time.entity.js'
import { parse } from 'path'


const em = orm.em

function sanitizeTallerInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    cupo: req.body.cupo,
    datetime: req.body.datetime,
    price: req.body.price,
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}


async function findAll(req: Request, res: Response) {
  try {
    const talleres = await em.find(Taller, {}, { populate: ['users'] })
    res.status(200).json({ message: 'found all talleres', data: talleres })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const taller = await em.findOneOrFail(Taller, { id }, { populate: ['users'] })
    res.status(200).json({ message: 'found taller', data: taller })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
async function add(req: Request, res: Response) {
  try {
    const taller = em.create(Taller, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'taller created', data: taller })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tallerToUpdate = await em.findOneOrFail(Taller, { id })
    em.assign(tallerToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'taller updated', data: tallerToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const taller = em.getReference(Taller, id)
    await em.removeAndFlush(taller)
    res.status(200).send({ message: 'taller deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {sanitizeTallerInput, findAll, findOne, add, update, remove}




{/*const em = orm.em

function sanitizeTallerInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    cupo: req.body.cupo,
    datetime: req.body.datetime,
    price: req.body.price,
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

interface TallerInput {
  name: string; 
  description: string;
  cupo: number;
  datetime: string;
  room: number;
  price: number;
  profesor: number;
}

async function findAll(req: Request, res: Response) {
  try {
    const talleres = await em.find(Taller, {}, { populate: ['datetime', 'room'] })
    res.status(200).json({ message: 'found all talleres', data: talleres })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const taller = await em.findOneOrFail(Taller, { id }, { populate: ['datetime', 'room'] })
    res.status(200).json({ message: 'found taller', data: taller })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


async function add(req: Request, res: Response) {
  try {
    console.log("Cuerpo de la solicitud:", req.body);
    const {
            name,
            description,
            cupo,
            datetime,
            room,
            price,
            profesor
        } = req.body as TallerInput;
  
    if (!name || !description || !cupo || !datetime || !room || !price || !profesor) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const roomEntity = await em.findOne(Room, { id: room });
    if (!roomEntity) {
      return res.status(400).json({ message: 'Invalid foreign key references' }); 
    }

    const parsedDate = new Date(datetime);

    // const existingTaller = await em.findOne(Taller, {
    //  room: roomEntity.id,
    //  datetime: parsedDate,
// });
   // if (existingTaller) {
   //   return res.status(400).json({ message: 'Taller already exists for the given room and datetime' });
   // };


    {/*console.log("Creating taller with data: ", {


      name,
      description,
      cupo,
      datetime,
      roomEntity,
      price
    })*/

    /*const taller = em.create(Taller, {
      name: name,
      description: description,
      cupo: cupo,
      datetime,
      room: roomEntity,
      price
    });


    await em.persistAndFlush(taller)
    res.status(201).json({ message: 'taller created', data: taller })
  } catch (error: any) {
    console.error("Error al crear el taller:", error);
    res.status(500).json({ message: error.message })
  }
}
/*async function add(req: Request, res: Response) {
  try {
    const taller = em.create(Taller, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'taller created', data: taller })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}*/

{/*async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tallerToUpdate = await em.findOneOrFail(Taller, { id })
    em.assign(tallerToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'taller updated', data: tallerToUpdate })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const taller = em.getReference(Taller, id)
    await em.removeAndFlush(taller)
    res.status(200).send({ message: 'taller deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}



export {sanitizeTallerInput, findAll, findOne, add, update, remove}*/}}