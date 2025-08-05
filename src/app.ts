import express  from 'express'
import { tallerRouter } from './taller/taller.routes.js'

const app = express()
app.use(express.json())

app.use('/api/talleres', tallerRouter)

app.use((req,res)=> {
  return res.status(404).send({message: 'Resource not found'})
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
