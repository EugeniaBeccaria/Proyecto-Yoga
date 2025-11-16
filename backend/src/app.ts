import 'dotenv/config';
import 'reflect-metadata'
import express  from 'express'
import { tallerRouter } from './taller/taller.routes.js'
import { orm, syncSchema } from './shared/DB/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { userRouter } from './user/user.routes.js';
import { membershipRouter } from './membership/membership.routes.js';
import { membershipTypeRouter } from './membership/membershipType.routes.js';
import { membershipPriceRouter } from './membership/membershipPrice.routes.js';
import { classsRouter } from './classs/classs.routes.js';
import { roomRouter } from './room/room.routes.js';
import { timeRouter } from './classs/time.routes.js';
import { dayRouter } from './classs/day.routes.js';
import { seedInitialData } from './scripts/seedInitialData.js';
import { doesNotReject } from 'assert';
import { authRouter }  from './auth/auth.routes.js'
import cors from 'cors'; 
import cookieParser from 'cookie-parser';

const app = express()
app.use(express.json())

// Configure CORS with credentials
app.use(cors({
  origin: 'http://localhost:5173', // URL de frontend
  credentials: true 
}));

// Configure COOP and COEP headers to allow OAuth popups
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

app.use(cookieParser())

app.use((req, res, next)=>{
  RequestContext.create(orm.em, next);
})

await syncSchema()
await seedInitialData();

app.use('/api/users', userRouter)
app.use('/api/talleres', tallerRouter)
app.use('/api/membership', membershipRouter)
app.use('/api/membershipType', membershipTypeRouter)
app.use('/api/membershipPrice', membershipPriceRouter)
app.use('/api/classes', classsRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/days', dayRouter)
app.use('/api/times', timeRouter)
app.use('/auth', authRouter)


app.use((req,res)=> {
  return res.status(404).send({message: 'Resource not found'})
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
