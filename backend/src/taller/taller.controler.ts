import {Request, Response, NextFunction} from 'express'
import { Taller } from './taller.entity.js'
import { orm } from '../shared/DB/orm.js'
import { Room } from '../room/room.entity.js' 
import { Day } from '../classs/day.entity.js' 
import { Time } from '../classs/time.entity.js'
import { User } from '../user/user.entity.js'
import { tallerService } from './taller.service.js'


const em = orm.em

interface TallerInput {
  name: string;
  description: string;
  cupo: number;
  date?: string;
  datetime?: string;
  roomId: string;
  price: number;
  profesorId: string;
  timeId: string;
}

function sanitizeTallerInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    cupo: req.body.cupo,
    date: req.body.date,
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
    const talleres = await em.find(Taller, {}, { populate: ['users', 'time', 'room', 'professor'] })
    res.status(200).json({ message: 'found all talleres', data: talleres })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const taller = await em.findOneOrFail(Taller, { id }, { populate: ['users', 'time', 'room', 'professor'] })
    res.status(200).json({ message: 'found taller', data: taller })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
async function add(req: Request, res: Response) {
  console.log("Cuerpo de la solicitud:", req.body);

  const {
    name,
    description,
    cupo,
    date: dateFromBody,
    datetime,
    roomId,
    price,
    profesorId,
    timeId
  } = req.body as TallerInput;
  const date = dateFromBody ?? datetime;

  try {
    if (!date) {
      return res.status(400).json({ message: 'La fecha es obligatoria' });
    }

    const [year, month, day] = date.split("-").map(Number);
    if (!year || !month || !day) {
      return res.status(400).json({ message: 'La fecha proporcionada no es válida' });
    }

    const dateObj = new Date(year, month - 1, day);

    if (Number.isNaN(dateObj.getTime())) {
      return res.status(400).json({ message: 'La fecha proporcionada no es válida' });
    }

    const dayOfWeek = dateObj.getDay();

    if (dayOfWeek !== 6) {
      return res.status(400).json({ 
        message: 'Los talleres solo pueden programarse los días sábado.' 
      });
    }

    const tallerAddData = await tallerService.add(
      name, 
      description, 
      cupo, 
      date, 
      roomId, 
      price, 
      profesorId, 
      timeId
    );

    res.status(201).json({ message: 'taller created', data: tallerAddData });
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
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
    const id = req.params.id
    const taller = em.getReference(Taller, id)
    await em.removeAndFlush(taller)
    res.status(200).send({ message: 'taller deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {sanitizeTallerInput, findAll, findOne, add, update, remove}
