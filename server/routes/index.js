const router = require('express').Router()
const routeUser = require('./routeUser')
const routeQuestion = require('./routeQuestion')

router.use('/users', routeUser)
router.use('/questions', routeQuestion)

module.exports = router