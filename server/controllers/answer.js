const Answer = require('../models/Answer')
const Question = require('../models/Question')

class ControllerAnswer {
  static fetchByQuestionId(req, res, next) {
    const { questionId } = req.params
    Question
      .find({ questionId })
      .populate('answers')
      .then(question => {
        const { answers } = question
        res.status(200).json({ answers })
      })
      .catch(next)
  }

  static fetchOne(req, res, next) {
    const _id = req.params.id
    Answer
      .findById(_id)
      .then(answer => {
        res.status(200).json({ answer })
      })
      .catch(next)
  }

  static add(req, res, next) {
    const question = req.params.questionId
    const { description } = req.body
    Answer
      .create({
        description, question, answerer: req.user.id
      })
      .then(answer => {
        return Question
          .updateOne({ _id: question }, 
            { $push: { answers: answer}})
          .then(() => {
            res.status(201).json({
              message: 'Successfully posted an answer!', answer
            })
          })
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { title, description } = req.body
    const _id = req.params.id
    Answer
      .findByIdAndUpdate(_id,
        { title, description },
        { omitUndefined: true, new: true })
      .then(answer => {
        res.status(200).json({
          message: 'Successfully updated an answer!', answer
        })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const _id = req.params.id
    Answer
      .findByIdAndDelete(_id)
      .then(answer => {
        res.status(200).json({
          "message": "Successfully deleted a answer!", answer
        })
      })
      .catch(next)
  }

  static upvote(req, res, next) {
    const _id = req.params.id
    Answer
      .findById(_id)
      .then(answer => {
        if (!answer) {
          throw {
            name: 'AnswerNotFound',
            status: 404,
            message: 'Answer not found!'
          }
        } else {
          return Answer
            .updateOne({ _id }, { $pull: { downvotes: req.user.id } }, { multi: true })
        }
      })
      .then(() => {
        return Answer
          .findById(_id)
      })
      .then(answer => {
        if (answer.upvotes.includes(req.user.id)) {
          return Answer
            .updateOne({ _id }, { $pull: { upvotes: req.user.id } }, { multi: true })
        } else {
          return Answer
            .updateOne({ _id }, { $push: { upvotes: req.user.id } }, { new: true })
        }
      })
      .then(answer => {
        res.status(200).json({
          "message": "Successfully updated your upvote to this answer!", answer
        })
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const _id = req.params.id
    Answer
      .findById(_id)
      .then(answer => {
        if (!answer) {
          throw {
            name: 'AnswerNotFound',
            status: 404,
            message: 'Answer not found!'
          }
        } else {
          return Answer
            .updateOne({ _id }, { $pull: { upvotes: req.user.id } }, { multi: true })
        }
      })
      .then(() => {
        return Answer
          .findById(_id)
      })
      .then(answer => {
        if (answer.downvotes.includes(req.user.id)) {
          return Answer
            .updateOne({ _id }, { $pull: { downvotes: req.user.id } }, { multi: true })
        } else {
          return Answer
            .updateOne({ _id }, { $push: { downvotes: req.user.id } }, { new: true })
        }
      })
      .then(answer => {
        res.status(200).json({
          "message": "Successfully updated your upvote to this answer!", answer
        })
      })
      .catch(next)
  }
}

module.exports = ControllerAnswer