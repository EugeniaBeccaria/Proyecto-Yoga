import {Request, Response, NextFunction} from 'express'

async function register(req:Request,res:Response){
    console.log(req.body)
}


async function login(req:Request,res:Response){
    console.log(req.body)
}

export {register,login}