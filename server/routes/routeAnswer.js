const router = require('express').Router()
const ControllerAnswer = require('../controllers/answer')
const authenticate = require('../middlewares/authenticate')
const authorizeAnswer = require('../middlewares/authorizeAnswer')

router.get('/:questionId', ControllerAnswer.fetchByQuestionId)

router.get('/:id', ControllerAnswer.fetchOne)

router.post('/:questionId', authenticate,  ControllerAnswer.add)

router.put('/:id', authenticate, authorizeAnswer, ControllerAnswer.update)

router.delete('/:id', authenticate, authorizeAnswer, ControllerAnswer.delete)

router.patch('/:id/upvote', authenticate, ControllerAnswer.upvote)

router.patch('/:id/downvote', authenticate, ControllerAnswer.downvote)

module.exports = router