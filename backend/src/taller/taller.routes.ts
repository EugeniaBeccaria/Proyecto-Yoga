import {Router} from 'express'
import { findAll, sanitizeTallerInput, findOne, add, update, remove } from './taller.controler.js'
import { isAdmin, verifyCookie } from '../auth/auth.middleware.js'
import { check } from 'express-validator'
import verifyResult from '../validation/validation.middleware.js'

export const tallerRouter = Router()

tallerRouter.get('/', findAll)
tallerRouter.get('/:id', findOne)
tallerRouter.post('/', verifyCookie, isAdmin,
    [
    check('name','El nombre es obligatorio').notEmpty(),
    check('description','La descripción es obligatoria').notEmpty(),
    check('roomId','El salón es obligatorio').isInt({min:1}),
    check('profesorId','El profesor es obligatorio').isInt({min:1}),
    check('datetime','La fecha y hora son obligatorias').notEmpty(),
    check('datetime','La fecha y hora deben ser mayores a la fecha actual').custom((value) => {
        const inputDate = new Date(value);
        const currentDate = new Date();
        return inputDate > currentDate;
    }),
    check('cupo','El cupo debe ser un número positivo').isInt({min:1}),
    check('price','El precio debe ser un número positivo').isFloat({min:0}),
    ],verifyResult, add)


tallerRouter.put('/:id', verifyCookie, isAdmin, sanitizeTallerInput, update)
tallerRouter.delete('/:id', verifyCookie, isAdmin, sanitizeTallerInput, remove)