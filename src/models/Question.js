import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (options) => options.length === 4,
        message: 'A question needs exactly four options.',
      },
    },
    answer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    examId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Question', questionSchema)
