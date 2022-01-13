import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(__dirname, '..', '.env')
})

import { app } from './app'
import mongoose from 'mongoose'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    await mongoose.connect('mongodb://localhost:27017/ts-express-mongoose')
    console.log('Connected to mongodb')
  } catch (e) {
    console.log(e)
  }

  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

start()
