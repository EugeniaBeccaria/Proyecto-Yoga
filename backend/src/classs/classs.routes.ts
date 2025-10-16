import {Router} from 'express'
import { verifyCookie, isProfessor } from '../auth/auth.middleware.js'
import { findAll, findOne, add, update, remove, findClassesByProfessorId } from './classs.controler.js'

export const classsRouter = Router()

classsRouter.get('/professor/classes', verifyCookie, isProfessor,findClassesByProfessorId) //pasa los filtros de verificacion de profesor y dp lo busca en el controlador
classsRouter.get('/', findAll)
classsRouter.get('/:id', findOne)
classsRouter.post('/', add)
classsRouter.put('/:id', update )
classsRouter.delete('/:id', remove)
