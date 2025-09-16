import {Request, Response, NextFunction} from 'express'
import { orm } from '../shared/DB/orm.js'
import { User } from './user.entity.js'
import { ValidationError } from '@mikro-orm/core'
import bcryptjs, { genSalt } from 'bcryptjs'

const em = orm.em

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

async function findAll(req: Request, res: Response) {
  try {
    const users = await em.find(User, {}, { populate: ['talleres', 'classes'] })
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

async function add(req: Request, res: Response) {
  try {
      const userData = req.body
      console.log(userData)

      console.log("Buscando usuarios existentes....")

      //validar que no exista un mismo email
      const email = userData.email
      const exist = await em.findOne(User,{email:email})
      if (exist) 
        return res.status(400).json({error:'Ya existe una cuenta con este email'})
      
      console.log("Encriptando la contraseña....")

      //Encriptar contraseña
      const salt = await genSalt()
      const hashPassword = await bcryptjs.hash(userData.password,salt)

      console.log("Instanciando el objeto....")

      const user = em.create(User, {
        name: userData.name,
        email: userData.email,
        password: hashPassword
      });
      
      //Persistir en BD
      await em.persistAndFlush(user);

      res.status(201).json({ message: 'user created', data: {
        name: user.name,
        email: user.email
      } })
    } 
    catch (error: any) {
      if (error instanceof ValidationError)
        return res.status(400).json({message: 'Datos invalidos', error:error})

      res.status(500).json({ message: error.message })
    }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const userToUpdate = await em.findOneOrFail(User, { id })
    em.assign(userToUpdate, req.body.sanitizedInput)
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
    const user = em.getReference(User, id)  //podria ser findOneOrfail
    await em.removeAndFlush(user)
    res.status(200).send({ message: 'user deleted' })
  } 
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export {sanitizeUserInput, findAll, findOne, add, update, remove}