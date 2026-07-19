import Exam from '../models/Exam.js'
import Question from '../models/Question.js'
import Result from '../models/Result.js'
import { listResults } from '../utils/listResults.js'
import { toClient } from '../utils/toClient.js'

const getNextId = () => Date.now()

export async function getResults(request, response) {
  response.json(await listResults())
}

export async function createResult(request, response) {
  const { examId, student, studentEmail, responses } = request.body
  const numericExamId = Number(examId)
  const normalizedStudentEmail = String(studentEmail || '').trim().toLowerCase()
  const normalizedStudentName = String(student || '').trim()

  if (!numericExamId || !normalizedStudentName) {
    response.status(400).json({ error: 'Student name and exam are required.' })
    return
  }

  const exam = await Exam.findOne({ id: numericExamId })
  if (!exam) {
    response.status(404).json({ error: 'Selected exam not found.' })
    return
  }

  const existingResult = await Result.findOne({
    examId: numericExamId,
    $or: normalizedStudentEmail
      ? [{ studentEmail: normalizedStudentEmail }, { student: normalizedStudentName }]
      : [{ student: normalizedStudentName }],
  })

  if (existingResult) {
    response.status(409).json({ error: 'You have already taken this exam.' })
    return
  }

  const examQuestions = await Question.find({ id: { $in: exam.questionIds || [] } })
  const responsesByQuestionId = new Map(
    (responses || []).map((entry) => [Number(entry.questionId), Number(entry.selectedOption)]),
  )

  const answers = examQuestions.map((question) => {
    const selectedOption = responsesByQuestionId.get(question.id)
    const isCorrect = selectedOption === question.answer

    return {
      questionId: question.id,
      selectedOption: Number.isFinite(selectedOption) ? selectedOption : null,
      correctOption: question.answer,
      isCorrect,
    }
  })

  const score = answers.reduce((count, answer) => count + (answer.isCorrect ? 1 : 0), 0)

  await Result.create({
    id: getNextId(),
    student: normalizedStudentName,
    studentEmail: normalizedStudentEmail,
    examId: exam.id,
    examTitle: exam.title,
    subject: exam.subject,
    score,
    total: examQuestions.length,
    published: false,
    date: new Date().toISOString(),
    answers,
  })

  response.status(201).json({ results: await listResults() })
}

export async function updateResult(request, response) {
  const result = await Result.findOneAndUpdate(
    { id: Number(request.params.id) },
    { $set: request.body },
    { new: true },
  )

  if (!result) {
    response.status(404).json({ error: 'Result not found.' })
    return
  }

  response.json(toClient(result))
}