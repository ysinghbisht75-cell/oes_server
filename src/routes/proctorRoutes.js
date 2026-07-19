import express from 'express'
import { createProctorEvent } from '../controllers/proctorController.js'

const router = express.Router()

router.post('/event', createProctorEvent)

export default router