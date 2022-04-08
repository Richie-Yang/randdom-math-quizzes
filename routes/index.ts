const router = require('express').Router()
const home = require('./modules/home')
const game = require('./modules/game')

router.use('/game', game)
router.use('/', home)

module.exports = router
