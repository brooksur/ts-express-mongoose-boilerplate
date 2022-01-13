import request from 'supertest'
import { app } from '../../app'

it('return a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testt@test.com',
      password: 'password'
    })
    .expect(201)
})

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'password'
    })
    .expect(400)
})

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: ''
    })
    .expect(400)
})

it('returns a 400 with missing email and password', async () => {
  return request(app).post('/api/users/signup').send({}).expect(400)
})

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pass'
    })
    .expect(201)

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pass'
    })
    .expect(400)
})

it('sets a cookie after successful signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pass'
    })
    .expect(201)

  expect(res.get('Set-Cookie')).toBeDefined()
})
