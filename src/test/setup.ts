import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../app'
import { signinRouter } from '../routes/signin'

declare global {
  var signin: () => Promise<string[]>
}

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf'
  await mongoose.connect('mongodb://localhost:27017/ts-express-mongoose-test')
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let coll of collections) {
    await coll.deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.connection.close()
})

global.signin = async () => {
  const email = 'test@test.com'
  const password = 'password'

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)

  const cookie = response.get('Set-Cookie')

  return cookie
}
