import {Router} from 'express'
import { findAll, findOne, add, update, remove } from './user.controler.js'
import { verifyCookie } from '../auth/auth.middleware.js'
import { check } from 'express-validator'
import verifyResult from '../validation/validation.middleware.js'
import { verifyEmail } from '../helpers/validators-helpers.js'


export const userRouter = Router()

userRouter.get('/',verifyCookie ,findAll)
userRouter.get('/:id', verifyCookie, findOne)
userRouter.put('/:id', verifyCookie, update )
userRouter.delete('/:id', verifyCookie, remove)

userRouter.post('/',[
    check('email','Email inválido').isEmail(),
    check('email').custom(verifyEmail),
    check('password','La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
    check('name','El nombre es obligatorio').notEmpty(),
    check('password', 'La contraseña debe tener al menos una mayúscula y un numero').matches(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
] , verifyResult, add)