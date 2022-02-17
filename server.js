import express from 'express'
import { MongoClient } from 'mongodb'

const app = express()


app.post('/api/users', express.json(), async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URL)
  client.connect()
  const users = client.db('todoapp').collection('users')

  const result = await users.insertOne(req.body)
  res.status(201).send({ ok: result.acknowledged })
  client.close()
})

app.get('/', (req, res) => res.send({ hello: 'world' }))

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000)
}

export default app