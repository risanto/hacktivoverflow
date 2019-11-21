const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const answerSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Body is missing.'],
    minlength: [30, 'Body must be at least 30 characters']
  },
  upvotes: {
    type: Array,
    default: []
  },
  downvotes: {
    type: Array,
    default: []
  },
  answerer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question : {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }
}, {
  timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer