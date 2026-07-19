import mongoose from 'mongoose'

const proctorEventSchema = new mongoose.Schema(
  {
    examId: {
      type: Number,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    student: {
      type: String,
      default: '',
      trim: true,
    },
    eventType: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      default: '',
      trim: true,
    },
    occurredAt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('ProctorEvent', proctorEventSchema)