import Exam from '../models/Exam.js'
import Question from '../models/Question.js'
import { listExams, listQuestions } from '../utils/listData.js'
import { toClient } from '../utils/toClient.js'

const getNextId = () => Date.now()

export async function getQuestions(request, response) {
  response.json(await listQuestions())
}

export async function getQuestionById(request, response) {
  const question = await Question.findOne({ id: Number(request.params.id) })

  if (!question) {
    response.status(404).json({ error: 'Question not found.' })
    return
  }

  response.json(toClient(question))
}

export async function createQuestion(request, response) {
  const { text, options, answer, examId } = request.body
  const targetExamId = Number(examId)

  if (!String(text || '').trim() || !targetExamId) {
    response.status(400).json({ error: 'Question text and exam are required.' })
    return
  }

  const exam = await Exam.findOne({ id: targetExamId })
  if (!exam) {
    response.status(404).json({ error: 'Selected exam not found.' })
    return
  }

  const question = await Question.create({
    id: getNextId(),
    text,
    options,
    answer,
    examId: targetExamId,
  })

  await Exam.updateOne(
    { id: question.examId },
    { $addToSet: { questionIds: question.id } },
  )

  response.status(201).json({
    questions: await listQuestions(),
    exams: await listExams(),
  })
}

export async function updateQuestion(request, response) {
  const questionId = Number(request.params.id)
  const previousQuestion = await Question.findOne({ id: questionId })

  if (!previousQuestion) {
    response.status(404).json({ error: 'Question not found.' })
    return
  }

  const updates = { ...request.body }
  if (updates.examId) {
    updates.examId = Number(updates.examId)
  }

  const question = await Question.findOneAndUpdate(
    { id: questionId },
    { $set: updates },
    { new: true },
  )

  if (updates.examId && updates.examId !== previousQuestion.examId) {
    await Exam.updateOne(
      { id: previousQuestion.examId },
      { $pull: { questionIds: questionId } },
    )
    await Exam.updateOne(
      { id: updates.examId },
      { $addToSet: { questionIds: questionId } },
    )
  }

  response.json({
    question: toClient(question),
    questions: await listQuestions(),
    exams: await listExams(),
  })
}

export async function deleteQuestion(request, response) {
  const questionId = Number(request.params.id)
  const question = await Question.findOneAndDelete({ id: questionId })

  if (!question) {
    response.status(404).json({ error: 'Question not found.' })
    return
  }

  await Exam.updateOne(
    { id: question.examId },
    { $pull: { questionIds: questionId } },
  )

  response.json({
    questions: await listQuestions(),
    exams: await listExams(),
  })
}
