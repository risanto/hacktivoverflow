const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const answerSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Body is missing.'],
    minlength: [30, 'Body must be at least 30 characters']
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  answerer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer