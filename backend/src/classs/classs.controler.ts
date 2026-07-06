import { Request, Response } from 'express'
import { classsService, ClassError } from './classs.service.js'

async function findAll(req: Request, res: Response) {
  try {
    const classes = await classsService.findAll()
    res.status(200).json({ message: 'found all classes', data: classes })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findAvailableClasses(req: Request, res: Response) {
  try {
    const classes = await classsService.findAvailableClasses()
    res.status(200).json({ message: 'found all classes', data: classes })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const classs = await classsService.findOne(id)
    res.status(200).json({ message: 'found class', data: classs })
  }
  catch (error: any) {
    if (error instanceof ClassError) {
      return res.status(error.status || 500).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const classs = await classsService.add(req.body.classData)
    res.status(201).json({ message: 'class created', data: classs })
  }
  catch (error: any) {
    if (error instanceof ClassError) {
      return res.status(error.status || 500).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const classsToUpdate = await classsService.update(id, req.body)
    res.status(200).json({ message: 'class updated', data: classsToUpdate })
  }
  catch (error: any) {
    if (error instanceof ClassError) {
      return res.status(error.status || 500).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const classToRemove = await classsService.remove(id)
    res.status(200).json({ message: 'class deleted', data: classToRemove })
  }
  catch (error: any) {
    if (error instanceof ClassError) {
      return res.status(error.status || 500).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
}

async function findClassesByProfessorId(req: Request, res: Response) {
  try {
    const professorId = req.user?.id;

    if (!professorId) {
      return res.status(400).json({ message: 'ID del profesor no encontrado en el token' });
    }

    const classes = await classsService.findClassesByProfessorId(professorId)
    res.status(200).json({ message: 'Clases del profesor encontradas', data: classes });

  } catch (error: any) {
    if (error instanceof ClassError) {
      return res.status(error.status || 500).json({ message: error.message })
    }
    console.error('Error al obtener clases del profesor:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function findMyEnrolledClasses(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario inválido en el token' });
    }

    const enrolledClasses = await classsService.findMyEnrolledClasses(userId)

    res.status(200).json({
      message: 'Clases inscritas encontradas',
      data: enrolledClasses
    });

  } catch (error: any) {
    if (error instanceof ClassError) {
      return res.status(error.status || 500).json({ message: error.message })
    }
    console.error('Error al buscar clases inscritas:', error);
    res.status(500).json({ message: error.message || 'Error interno del servidor.' });
  }
}

export { findAll, findOne, add, update, remove, findClassesByProfessorId, findAvailableClasses, findMyEnrolledClasses }