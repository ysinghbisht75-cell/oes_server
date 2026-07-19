import express from 'express'
import {
  createResult,
  getResults,
  updateResult,
} from '../controllers/resultController.js'

const router = express.Router()

router.get('/', getResults)
router.post('/', createResult)
router.put('/:id', updateResult)

export default router