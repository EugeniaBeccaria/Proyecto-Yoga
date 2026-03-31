import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { User } from './user.entity.js'
import { IntegerType, ValidationError } from '@mikro-orm/core'
import bcrypt, { genSalt } from 'bcrypt'
import { userService } from './user.service.js'

const em = orm.em;

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
    name: req.body.name,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    email: req.body.email,
    phone: req.body.phone,
    dni: req.body.dni,
    rol: req.body.rol,
    password: req.body.password
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

interface FilterParameters {
  role?: string;
}

async function findAll(req: Request, res: Response) {
  try {
    const userRoleFilter = req.query.role;
    console.log("Filtro de rol recibido:", userRoleFilter);
    const filterParameters: FilterParameters = {}; 

      if (userRoleFilter) {
        filterParameters.role = (userRoleFilter) as string;
      }

    const users = await em.find(User, filterParameters, { populate: ['talleres', 'classes'] })
    res.status(200).json({ message: 'found all users', data: users })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const user = await em.findOneOrFail(User, { id }, { populate: ['talleres', 'classes'] })
    res.status(200).json({ message: 'found user', data: user })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findMe(req: Request, res: Response) {
  try {
    const id = Number(req.user?.id)
    if (!id) {
      return res.status(400).json({ message: 'ID del usuario no encontrado en el token' })
    }

    const user = await em.findOneOrFail(User, { id })
    res.status(200).json({ message: 'found current user', data: user })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
      const {name, lastname, email, phone, dni, password} = req.body
      const existingUser = await em.findOne(User, { email })
      if (existingUser) {
        return res.status(409).json({ message: 'El email ya está registrado.' })
      }
      const role = (req.query.role) as string;
      const registerDataUser = await userService.register(name, lastname, email, phone, dni, password, role)

      res.status(201).json({ message: 'user created', data: registerDataUser })
    } 
    catch (error: any) {
      res.status(500).json({ message: error.message })
    }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number(req.user?.id)
    if (!id) {
      return res.status(400).json({ message: 'ID del usuario no encontrado en el token' });
    }
    const userToUpdate = await em.findOneOrFail(User, { id })
    console.log(req.body)
    const {name, birthdate, email, phone, dni} = req.body
    if(name) userToUpdate.name = name
    if(birthdate) userToUpdate.birthdate = birthdate
    if(email) userToUpdate.email = email
    if(phone) userToUpdate.phone = phone
    if(dni) userToUpdate.dni = dni
    em.persist(userToUpdate) // no es necesario usar persist para entidades ya existentes
    await em.flush()
    res.status(200).json({ message: 'user updated', data: userToUpdate })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const user = await em.findOneOrFail(User, { id })  //podria ser findOneOrfail
    em.remove(user)
    await em.flush()
    res.status(200).send({ message: 'user deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


export {sanitizeUserInput, findAll, findOne, findMe, add, update, remove}