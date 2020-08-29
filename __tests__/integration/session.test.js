const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../utils/truncate')
const factory = require('../factory')

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should anthenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(200)
  })

  it('should failed with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123'
    })

    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(401)
  })

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.body).toHaveProperty('token')
  })

  it('shoud not be able to access private route without a token', async () => {
    const response = await request(app)
      .get('/dashboard')

    expect(response.status).toBe(403)
  })

  it('shoud be not able to access private route with a invalid token', async () => {
    const token = `Bearer dadamdiwhdwu9wubd9da9b`

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', token)

    expect(response.status).toBe(403)
  })

  it('should be able to access private route with a valid token', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.body).toHaveProperty('user_id')
    // expect(response.status).toBe(200)
  })
})