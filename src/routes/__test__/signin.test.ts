import request from 'supertest'
import { app } from '../../app'

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  await request(app).post('/api/users/signin').send({
    email: 'test@test.com',
    password: 'drowssap'
  })
})

it('responds with a cookie when givin valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtt@test.com',
      password: 'password'
    })
    .expect(201)

  const res = await request(app).post('/api/users/signin').send({
    email: 'testtt@test.com',
    password: 'password'
  })

  expect(res.get('Set-Cookie')).toBeDefined()
})
