const Question = require('../models/Question')

class ControllerQuestion {
  static fetchAll(req, res, next) {
    Question
      .find()
      .then(questions => {
        res.status(200).json({ questions })
      })
      .catch(next)
  }

  static fetchOne(req, res, next) {
    const _id = req.params.id
    Question
      .findById(_id)
      .then(question => {
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
    const _id = req.params.id
    const { upvotes } = req.body
    Question
      .findByIdAndUpdate(_id, { upvotes },
        { new: true })
      .then(question => {
        res.status(200).json({
          "message": "Successfully upvoted a question!", question
        })
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const _id = req.params.id
    const { downvotes } = req.body
    Question
      .findByIdAndUpdate(_id, { downvotes },
        { new: true })
      .then(question => {
        res.status(200).json({
          "message": "Successfully downvoted a question!", question
        })
      })
      .catch(next)
  }
}

module.exports = ControllerQuestion