import { Request, Response } from 'express'
import { tallerService, tallerError } from './taller.service.js'

async function findAll(req: Request, res: Response) {
  try {
    const talleres = await tallerService.findAll()
    res.status(200).json({ message: 'found all talleres', data: talleres })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const taller = await tallerService.findOne(id)
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
  } = req.body;
  const date = dateFromBody ?? datetime;

  try {
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
    if (error instanceof tallerError) {
      return res.status(error.status || 500).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const tallerToUpdate = await tallerService.update(id, req.body)
    res.status(200).json({ message: 'taller updated', data: tallerToUpdate })
  } 
  catch (error: any) {
    if (error instanceof tallerError) {
      return res.status(error.status || 500).json({ message: error.message });
    }
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    await tallerService.remove(id)
    res.status(200).send({ message: 'taller deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findTalleresByProfessorId(req: Request, res: Response) {
  try {
    const professorId = req.user?.id;

    if (!professorId) {
      return res.status(400).json({ message: 'ID del profesor no encontrado en el token' });
    }

    const talleres = await tallerService.findTalleresByProfessorId(professorId)
    res.status(200).json({ message: 'Talleres del profesor encontrados', data: talleres });

  } catch (error: any) {
    console.error('Error al obtener talleres del profesor:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export { findAll, findOne, add, update, remove, findTalleresByProfessorId }
