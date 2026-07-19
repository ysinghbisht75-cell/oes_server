import Exam from '../models/Exam.js'
import Question from '../models/Question.js'
import { listExams, listQuestions } from '../utils/listData.js'
import { toClient } from '../utils/toClient.js'

const getNextId = () => Date.now()

export async function getExams(request, response) {
  response.json(await listExams())
}

export async function getExamById(request, response) {
  const exam = await Exam.findOne({ id: Number(request.params.id) })

  if (!exam) {
    response.status(404).json({ error: 'Exam not found.' })
    return
  }

  response.json(toClient(exam))
}

export async function createExam(request, response) {
  const { title, subject, duration, startDate, endDate, status, questionIds } = request.body

  if (!String(title || '').trim() || !String(subject || '').trim()) {
    response.status(400).json({ error: 'Exam title and subject are required.' })
    return
  }

  await Exam.create({
    id: getNextId(),
    title,
    subject,
    duration: Number(duration) || 30,
    startDate: startDate || '',
    endDate: endDate || '',
    status: status || 'Draft',
    questionIds: questionIds || [],
  })

  response.status(201).json(await listExams())
}

export async function updateExam(request, response) {
  const exam = await Exam.findOneAndUpdate(
    { id: Number(request.params.id) },
    { $set: request.body },
    { new: true },
  )

  if (!exam) {
    response.status(404).json({ error: 'Exam not found.' })
    return
  }

  response.json(await listExams())
}

export async function deleteExam(request, response) {
  const examId = Number(request.params.id)
  const exam = await Exam.findOneAndDelete({ id: examId })

  if (!exam) {
    response.status(404).json({ error: 'Exam not found.' })
    return
  }

  await Question.deleteMany({ examId })

  response.json({
    exams: await listExams(),
    questions: await listQuestions(),
  })
}
