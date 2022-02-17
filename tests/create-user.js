import { test } from 'uvu'
import * as assert from 'uvu/assert'
import request from 'supertest'
import app from '../server.js'
import mongoUnit from 'mongo-unit'

test('POST /api/users', async () => {
  // setup
  await mongoUnit.start().then(() => {
    console.log('fake mongo is started: ', mongoUnit.getUrl())
    process.env.MONGO_URL = mongoUnit.getUrl()
  })

  await request(app)
    .post('/api/users')
    .send({ _id: 'user-1', type: 'user', username: 'rakis' })
    .expect('Content-Type', /json/)
    .expect(201)
    .expect(({ body }) => assert.is(body.ok, true))

  // teardown
  await mongoUnit.stop()
})

test.run()