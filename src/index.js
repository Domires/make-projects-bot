const express = require('express')
const cors = require('cors')

const mongoConnect = require('./configs/db')

mongoConnect()

require('./router')

const app = express()

app.use(cors())

app.set('PORT', 3001)

app.listen(app.get('PORT'), console.log('bot online!'))