import Exam from '../models/Exam.js'
import Question from '../models/Question.js'
import { toClient } from './toClient.js'

export async function listExams() {
  const exams = await Exam.find().sort({ createdAt: -1 })
  return exams.map(toClient)
}

export async function listQuestions() {
  const questions = await Question.find().sort({ createdAt: -1 })
  return questions.map(toClient)
}
