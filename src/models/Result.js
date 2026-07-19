import mongoose from 'mongoose'

const resultSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    student: {
      type: String,
      required: true,
      trim: true,
    },
    studentEmail: {
      type: String,
      default: '',
      trim: true,
      lowercase: true,
    },
    examId: {
      type: Number,
      required: true,
    },
    examTitle: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
    date: {
      type: String,
      default: '',
    },
    answers: {
      type: [
        {
          questionId: Number,
          selectedOption: Number,
          correctOption: Number,
          isCorrect: Boolean,
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
)

export default mongoose.model('Result', resultSchema)