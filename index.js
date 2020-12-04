const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const submitRouter = require('./routes/submit-router')
const userRouter = require('./routes/user-router')
const rolRouter = require('./routes/rol-router')
const actionRouter = require('./routes/action-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', submitRouter)
app.use('/api', userRouter)
app.use('/api', rolRouter)
app.use('/api', actionRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
