var express = require('express'),
	bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    config = require('./config')

var app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors)
app.use(logger('dev'))

// mongoose.connect(config.database)

var apiRoutes = require('./routes')(app, express)
app.use('/api', apiRoutes)

app.listen(config.port)
console.log('Up and running on port ', + config.port)