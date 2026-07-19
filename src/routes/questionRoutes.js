import express from 'express'
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from '../controllers/questionController.js'

const router = express.Router()

router.get('/', getQuestions)
router.get('/:id', getQuestionById)
router.post('/', createQuestion)
router.put('/:id', updateQuestion)
router.delete('/:id', deleteQuestion)

export default router
