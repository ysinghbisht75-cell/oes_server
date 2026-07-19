import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

const mongoUri = process.env.MONGO_URI
const dbName = process.env.MONGO_DB_NAME || 'oes'

export async function connectDatabase() {
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined')
  }

  await mongoose.connect(mongoUri, { dbName })
  await User.updateOne(
    { email: 'admin@gmail.com' },
    {
      $setOnInsert: {
        id: 1,
        role: 'admin',
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'admin@123',
      },
    },
    { upsert: true },
  )
}
