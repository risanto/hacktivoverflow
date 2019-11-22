const Question = require('../models/Question')

class ControllerQuestion {
  static fetchAll(req, res, next) {
    Question
      .find()
      .populate('answers')
      .populate('asker')
      .then(questions => {
        res.status(200).json({ questions })
      })
      .catch(next)
  }

  static fetchOne(req, res, next) {
    const _id = req.params.id
    Question
      .findById(_id)
      .populate({
        path: 'answers',
        populate: {
          path: 'answerer'
        }
      })
      .populate('asker')
      .then(question => {
        // console.log('ini fetch one question', question);
        res.status(200).json({ question })
      })
      .catch(next)
  }

  static add(req, res, next) {
    const { title, description } = req.body
    Question
      .create({
        title, description, asker: req.user.id
      })
      .then(question => {
        res.status(201).json({
          message: 'Successfully posted a question!', question
        })
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { title, description } = req.body
    const _id = req.params.id
    Question
      .findByIdAndUpdate(_id,
        { title, description },
        { omitUndefined: true, new: true })
      .then(question => {
        res.status(200).json({
          message: 'Successfully updated a question!', question
        })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const _id = req.params.id
    Question
      .findByIdAndDelete(_id)
      .then(question => {
        res.status(200).json({
          "message": "Successfully deleted a question!", question
        })
      })
      .catch(next)
  }

  static upvote(req, res, next) {
    // console.log('ini req user id', req.user.id);
    const _id = req.params.id
    Question
      .findById(_id)
      .then(question => {
        if (!question) {
          throw {
            name: 'QuestionNotFound',
            status: 404,
            message: 'Question not found!'
          }
        } else {
          return Question
            .updateOne({ _id }, { $pull: { downvotes: req.user.id } }, { multi: true })
        }
      })
      .then(() => {
        return Question
          .findById(_id)
      })
      .then(question => {
        if (question.upvotes.includes(req.user.id)) {
          return Question
            .updateOne({ _id }, { $pull: { upvotes: req.user.id } }, { multi: true })
        } else {
          return Question
            .updateOne({ _id }, { $push: { upvotes: req.user.id } }, { new: true })
        }
      })
      .then(question => {
        res.status(200).json({
          "message": "Successfully updated your upvote to this question!", question
        })
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const _id = req.params.id
    Question
      .findById(_id)
      .then(question => {
        if (!question) {
          throw {
            name: 'QuestionNotFound',
            status: 404,
            message: 'Question not found!'
          }
        } else {
          return Question
            .updateOne({ _id }, { $pull: { upvotes: req.user.id } }, { multi: true })
        }
      })
      .then(() => {
        return Question
          .findById(_id)
      })
      .then(question => {
        if (question.downvotes.includes(req.user.id)) {
          return Question
            .updateOne({ _id }, { $pull: { downvotes: req.user.id } }, { multi: true })
        } else {
          return Question
            .updateOne({ _id }, { $push: { downvotes: req.user.id } }, { new: true })
        }
      })
      .then(question => {
        res.status(200).json({
          "message": "Successfully updated your upvote to this question!", question
        })
      })
      .catch(next)
  }
}

module.exports = ControllerQuestion