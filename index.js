require('dotenv').config()
const enviroment = require("./config/enviroment");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const submitRouter = require('./routes/submit-router')
const userRouter = require('./routes/user-router')
const rolRouter = require('./routes/rol-router')
const actionRouter = require('./routes/action-router')
const categoryRouter = require('./routes/category-router')
const productRouter = require('./routes/product-router')

const app = express()

const apiPort = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/public', express.static(`${__dirname}/uploads`))

app.use('/api', submitRouter)
app.use('/api', userRouter)
app.use('/api', rolRouter)
app.use('/api', actionRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)

app.listen(apiPort, () => console.log(`Server running: ${enviroment.ApiUrl()}`))
