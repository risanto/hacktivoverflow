module.exports = (err, req, res, next) => {
  console.log('ini err di err handler', err);
  
  let errStatus
  let messages = []

  if (err.name === 'CastError' && err.message.includes('Cast to ObjectId failed', 'Product')) {
    errStatus = 404
    messages.push('Product not found!')
  }
  else if (err.name === 'JsonWebTokenError') {
    errStatus = 401
    messages.push('Unauthorized access!')
  }
  else if (err.name === 'ValidationError') {
    errStatus = 400
    for (key in err.errors) {
      if (err.errors[key].message) {
        messages.push(err.errors[key].message)
      }
    }
  }
  else if (err.name === 'MongoError') {
    if (err.errmsg.includes('duplicate key error')) {
      errStatus = 400
      messages.push('Email has already been used!')
    }
  }
  else {
    errStatus = err.status
    messages.push(err.message)
  }
  res.status(errStatus ? errStatus : 500).json({ messages })
  next()
}