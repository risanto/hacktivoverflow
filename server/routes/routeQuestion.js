const router = require('express').Router()
const ControllerQuestion = require('../controllers/question')
const authenticate = require('../middlewares/authenticate')
const authorizeQuestion = require('../middlewares/authorizeQuestion')

router.get('/', ControllerQuestion.fetchAll)

router.get('/:id', ControllerQuestion.fetchOne)

router.post('/', authenticate,  ControllerQuestion.add)

router.put('/:id', authenticate, authorizeQuestion, ControllerQuestion.update)

router.delete('/:id', authenticate, authorizeQuestion, ControllerQuestion.delete)

router.patch('/:id/upvote', authenticate, ControllerQuestion.upvote)

router.patch('/:id/downvote', authenticate, ControllerQuestion.downvote)

module.exports = router