var jwt    = require('jsonwebtoken')
var config = require('./config.js')
var models = require('./models/models.js')
var User   = models.User
var Player = models.Player

var sendToken = function(res, user) {
	var data  = { user: user._id, player: user.player || null }
	var token = jwt.sign(data, config.secret)
	res.send({success: true, token: token})
}

var bounce = function(res, msg) {
	res.json({success: false, message: msg})
}

module.exports = {
	tutorial: function(req, res) {
		var user = 'playerID for tutorial'
		// find first?
		sendToken(res, user)
	},
	
	login: function(req, res) {
		User.findOne({email: req.body.email}, function (err, user) {
			if (err) 		bounce(res, 'Database error.')
			if (!user) 		bounce(res, 'Email not found.')
			else {
				var password = req.body.password
				if (user.check(password)) 	sendToken(res, user)
				else 						bounce(res, 'Incorrect password.')
			}
		})
	},

	signup: function(req, res) { // passed in {linked: true} on client side
		Player.create(req.body, function(err, player) {
			req.body.player = player._id 	// links player id to user
			User.create(req.body, function(err, user) {
				if (err)  	bounce(res, 'Database error.')
				else  		sendToken(res, user)
			})
		})
	},

	decodeToken: function(req, res, next) {
		var token = req.headers['x-access-token'] || req.body.token
		if (token) {
			jwt.verify(token, config.secret, function(err, decoded) {
				if (err)	 return bounce(res, 'Bad token.')
				else { 
					req.token = decoded
					next()
				}
			})
		} else {
			return res.status(403).send({success: false, message: 'No token.'})
		}
	}

}