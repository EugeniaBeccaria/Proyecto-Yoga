import {Router} from 'express'
import { verifyCookie, isProfessor, isAdmin } from '../auth/auth.middleware.js'
import { findAll, findOne, add, update, remove, findClassesByProfessorId } from './classs.controler.js'

export const classsRouter = Router()

classsRouter.get('/professor/classes', verifyCookie, isProfessor,findClassesByProfessorId) //pasa los filtros de verificacion de profesor y dp lo busca en el controlador
classsRouter.get('/',verifyCookie, findAll)
classsRouter.get('/:id', verifyCookie, findOne)
classsRouter.post('/', verifyCookie, isAdmin, add)
classsRouter.put('/:id', verifyCookie, isAdmin, update )
classsRouter.delete('/:id', verifyCookie, isAdmin, remove)
