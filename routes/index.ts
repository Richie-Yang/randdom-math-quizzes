const router = require('express').Router()
const home = require('./modules/home')
const game = require('./modules/game')
const { authenticated } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/game/:userId', authenticated, game)
router.use('/', home)
router.use('/', generalErrorHandler)

module.exports = router
