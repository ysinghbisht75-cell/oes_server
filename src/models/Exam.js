import mongoose from 'mongoose'

const examSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      default: 30,
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    questionIds: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true },
)

export default mongoose.model('Exam', examSchema)
