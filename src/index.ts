import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(__dirname, '..', '.env')
})

import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()

app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_END === 'production'
  })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

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
