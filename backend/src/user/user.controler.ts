import { Request, Response } from 'express'
import { userService, UserError } from './user.service.js'

async function findAll(req: Request, res: Response) {
  try {
    const userRoleFilter = req.query.role as string | undefined;
    console.log("Filtro de rol recibido:", userRoleFilter);
    
    const users = await userService.findAll(userRoleFilter)
    res.status(200).json({ message: 'found all users', data: users })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findMe(req: Request, res: Response) {
  try {
    const id = req.user?.id
    if (!id) {
      return res.status(400).json({ message: 'ID del usuario no encontrado en el token' })
    }

    const user = await userService.findMe(id)
    res.status(200).json({ message: 'found current user', data: user })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
      const { name, lastname, email, phone, dni, password } = req.body
      const role = (req.query.role) as string;
      const registerDataUser = await userService.register(name, lastname, email, phone, dni, password, role)

      res.status(201).json({ message: 'user created', data: registerDataUser })
  } 
  catch (error: any) {
      if (error instanceof UserError) {
        return res.status(error.status || 500).json({ message: error.message })
      }
      res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.user?.id
    if (!id) {
      return res.status(400).json({ message: 'ID del usuario no encontrado en el token' });
    }
    console.log(req.body)
    const userToUpdate = await userService.update(id, req.body)
    res.status(200).json({ message: 'user updated', data: userToUpdate })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

// Cambio de contraseña
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: 'ID del usuario no encontrado en el token' });
    }

    await userService.changePassword(userId, currentPassword, newPassword);
    return res.status(200).json({ message: 'Contraseña actualizada con éxito' });

  } catch (error: any) {
    if (error instanceof UserError) {
      return res.status(error.status || 500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Error del servidor. Inténtalo de nuevo más tarde.' });
  }
};

//Listado Alumnos
async function getStudents(req: Request, res: Response) {
  try {
    const studentsWithMemberships = await userService.getStudents();
    res.status(200).json({ message: 'Listado de Alumnos', data: studentsWithMemberships });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findMe, add, update, getStudents }