const router = require('express').Router()
const routeUser = require('./routeUser')
const routeQuestion = require('./routeQuestion')
const routeAnswer = require('./routeAnswer')

router.use('/users', routeUser)
router.use('/questions', routeQuestion)
router.use('/answers', routeAnswer)

module.exports = router