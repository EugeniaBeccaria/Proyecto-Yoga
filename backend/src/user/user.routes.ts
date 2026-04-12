import {Router} from 'express'
import { findAll, findOne, findMe, add, update, remove } from './user.controler.js'
import { verifyCookie } from '../auth/auth.middleware.js'
import { check } from 'express-validator'
import verifyResult from '../validation/validation.middleware.js'
import { verifyEmail } from '../helpers/validators-helpers.js'
import { changePassword } from './user.controler.js'


export const userRouter = Router()

userRouter.get('/' ,findAll)
userRouter.get('/me', verifyCookie, findMe)

userRouter.put('/update',verifyCookie,[
    check('birthdate','Fecha de nacimiento inválida').optional({ values: 'falsy' }).isISO8601(),
    check('phone','Número de teléfono inválido').optional({ values: 'falsy' }).isMobilePhone('any'),
    check('dni','DNI inválido')
        .optional({ values: 'falsy' })
        .matches(/^\d{7,9}$/)
    ],verifyResult,update)

userRouter.get('/:id', verifyCookie, findOne)
userRouter.delete('/:id', remove)

userRouter.post('/',[
    check('email','Email inválido').isEmail(),
    check('email').custom(verifyEmail),
    check('password','La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
    check('name','El nombre es obligatorio').notEmpty(),
    check('lastname','El apellido es obligatorio').notEmpty(),
    check('password', 'La contraseña debe tener al menos una mayúscula y un numero').matches(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
] , verifyResult, add)

userRouter.put('/change-password', verifyCookie, 
    [
        check('currentPassword', 'La contraseña actual es obligatoria').notEmpty(),
        check('newPassword', 'La nueva contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
        check('newPassword', 'La nueva contraseña debe tener al menos una mayúscula y un numero').matches(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
    ], verifyResult, changePassword)
