const Answer = require('../models/Answer')

module.exports = (req, res, next) => {
  
  try {
    const _id = req.params.id
    const answerer = req.user.id
    console.log('masuk authorize answer', _id, answerer);
    
    Answer
      .findOne({ _id, answerer })
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