require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()

const watsonRouter = require('./routes/watson')

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

router.use(watsonRouter)

app.use('/api', router)
app.get('*', (req, res, next) => {
  res.status(200).json({
    message: 'Server ChattyBot ON',
    status: 200,
  })
})

module.exports = app
