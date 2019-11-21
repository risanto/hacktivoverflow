const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is missing.'],
    minlength: [15, 'Title must be at least 15 characters.']
  },
  description: {
    type: String,
    required: [true, 'Description is missing.'],
    minlength: [30, 'Description must be at least 30 characters']
  },
  upvotes: {
    type: Array,
    default: []
  },
  downvotes: {
    type: Array,
    default: []
  },
  asker: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
}, {
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question