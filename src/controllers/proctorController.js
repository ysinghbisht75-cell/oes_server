import ProctorEvent from '../models/ProctorEvent.js'

export async function createProctorEvent(request, response) {
  const { details, eventType, examId, occurredAt, student, studentEmail } = request.body

  const normalizedEmail = String(studentEmail || '').trim().toLowerCase()
  const normalizedEvent = String(eventType || '').trim()
  const numericExamId = Number(examId)

  if (!numericExamId || !normalizedEmail || !normalizedEvent) {
    response.status(400).json({ error: 'Exam id, student email, and event type are required.' })
    return
  }

  await ProctorEvent.create({
    examId: numericExamId,
    studentEmail: normalizedEmail,
    student: String(student || '').trim(),
    eventType: normalizedEvent,
    details: String(details || '').trim(),
    occurredAt: String(occurredAt || new Date().toISOString()),
  })

  response.status(201).json({ ok: true })
}