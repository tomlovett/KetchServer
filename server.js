var express    = require('express'),
	bodyParser = require('body-parser'),
    logger     = require('morgan'),
    mongoose   = require('mongoose'),
    cors       = require('cors'),
    config     = require('./config')

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
// console.log('cors: ', cors)
app.use(logger('dev'))

mongoose.connect(config.database)

app.use('/', function(req, res, next) {
	console.log('activity')
	next()
})

var authRoutes = require('./routes.auth')(app, express)
app.use('/auth', authRoutes)

var apiRoutes = require('./routes.api')(app, express)
app.use('/api', apiRoutes)

app.listen(config.port)
console.log('Up and running on port: ', config.port)