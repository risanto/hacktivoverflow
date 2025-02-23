const User = require('../models/User')
const verifyToken = require('../helpers/verifyToken')

module.exports = (req, res, next) => {
  try {
    
    const { access_token } = req.headers
    // console.log('masuk authenticate ini access token nya', req.headers);

    const decoded = verifyToken(access_token, next)
    
    // console.log('2 >>> masuk authenticate ini access token-nya', access_token);
    // console.log('masuk authenticate ini decoded-nya', decoded);

    if (!decoded) {
      throw {
        name: 'Unauthorized',
        status: 401,
        message: 'Unauthorized access!'
      }
    }

    const { payload } = decoded

    User
      .findOne({ email: payload.email })
      .then(user => {
        if (!user) {
          throw {
            name: 'Unauthorized',
            status: 401,
            message: 'Unauthorized access!'
          }
        }

        req.user = { id: user._id, email: payload.email }
        // console.log('ini payload dan user', payload, req.user);
        
        next()
      })
      .catch(next)
  }
  catch (err) { next(err) }
}