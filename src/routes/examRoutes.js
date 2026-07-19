import express from 'express'
import {
  createExam,
  deleteExam,
  getExamById,
  getExams,
  updateExam,
} from '../controllers/examController.js'

const router = express.Router()

router.get('/', getExams)
router.get('/:id', getExamById)
router.post('/', createExam)
router.put('/:id', updateExam)
router.delete('/:id', deleteExam)

export default router
