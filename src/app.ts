import 'reflect-metadata'
import express  from 'express'
import { tallerRouter } from './taller/taller.routes.js'
import { orm, syncSchema } from './shared/DB/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { userRouter } from './user/user.routes.js';

const app = express()
app.use(express.json())

app.use((req, res, next)=>{
  RequestContext.create(orm.em, next);
})

await syncSchema()

app.use('/api/user', userRouter)
app.use('/api/talleres', tallerRouter)

app.use((req,res)=> {
  return res.status(404).send({message: 'Resource not found'})
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
