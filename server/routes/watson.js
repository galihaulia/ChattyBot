const express = require('express')
const router = express.Router()
const { getSession, postMssg } = require('../controllers/watson')

router.get('/session', getSession)
router.post('/message', postMssg)

module.exports = router
