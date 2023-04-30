// pacotes
const compression = require('compression')
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

// start
const app = express()

// ambiente
const isProduction = process.env.NODE_ENV === 'Production'
const PORT = process.env.PORT || 3000

// arquivos estáticos
app.use('/public', express.static(__dirname + '/public'))
app.use('/public/img', express.static(__dirname + '/public/img'))

// setup mongodb
const dbs = require('./config/database.json')
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest
mongoose.connect(dbURI, { userNewUrlParser: true })

// setup ejs
app.set('view engine', 'ejs')

// configurações de ajuda
if(!isProduction) app.use(morgan('dev'))
app.use(cors())
app.disable('x-powered-by')
app.use(compression())

// setup body parser
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5*1024*1024 }))
app.use(bodyParser.json({ limit: 1.5*1024*1024 }))

// models
require('./models')

// rotas
app.use('/', require('./routes'))

// rota 404
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// rota 402, 500, 401
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    if(err.status !== 404) console.warn('Error: ', err.message, new Date())
    res.json({ errors: { message: err.message, status: err.status } })
})

// listen
app.listen(PORT, (err) => {
    if(err) throw err
    console.log(`Listen in //localhost:${PORT}`)
})