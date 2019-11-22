const Question = require('../models/Question')

module.exports = (req, res, next) => {
  try {
    const _id = req.params.id
    const asker = req.user.id

    // console.log('ini asker di authorize question', asker);
    
    Question
      .findOne({ _id, asker })
      .then(user => {      
        if (!user) throw {
          name: 'Unauthorized',
          status: 401,
          message: 'Unauthorized access!'
        }
        next()
      })
      .catch(next)
  }
  catch (err) { next(err) }
}