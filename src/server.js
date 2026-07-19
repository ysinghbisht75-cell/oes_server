import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDatabase } from './db.js'
import authRoutes from './routes/authRoutes.js'
import examRoutes from './routes/examRoutes.js'
import proctorRoutes from './routes/proctorRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import resultRoutes from './routes/resultRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (request, response) => {
  response.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/exams', examRoutes)
app.use('/api/proctor', proctorRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/results', resultRoutes)

app.use((error, request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: 'Server error. Check the API terminal.' })
})

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
