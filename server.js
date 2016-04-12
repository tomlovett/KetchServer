var express = require('express'),
	bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    port = process.env.PORT || 8080

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(logger('dev'))