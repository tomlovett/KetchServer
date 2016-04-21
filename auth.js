var jwt    = require('jsonwebtoken')
var config = require('./config.js')
var models = require('./models/models.js')
var User   = models.User
var Player = models.Player

// var noUser = f()
// var badPassword = f()
// var setToken = f()

module.exports = {
	tutorial: function(req, res) {
		var token = jwt.sign({ user: 'tutorialUser', player: 'hero' })
		res.json({success: true, token: token})
	},
	
	login: function(req, res) {
		User.findOne({email: req.body.email}, function (err, user) {
			if (err) 	res.json({success: false, message: 'Database error.'})
			if (!user) { 
				res.json({success: false, message: 'Email not found.' })
			} else {
				if (user.comparePassword(req.body.password)) {
					var token = jwt.sign({
						user  : user._id,
						player: user.player || null
					}, config.secret)
					res.json({success: true, token: token})
				} else {
					res.json({success: false, message: 'Incorrect password.'})
				}
			}
		})
	},

	signup: function(req, res) { // passed in {linked: true} on client side
		Player.create(req.body, function(err, playerDoc) {
			req.body.player = playerDoc._id
			User.create(req.body, function(err, userDoc) {
				if (err)   res.json({success: false, message: 'Database error.'})
				else  { 
					var token = jwt.sign({
						user  : userDoc._id,
						player: userDoc.player || null
					}, config.secret)
					res.json({success: true, token: token})
				}
			})
		})
	},

	decodeToken: function(req, res, next) {
		console.log('authenticating...')
		var token = req.headers['x-access-token'] || req.body.token
		if (token) {
			jwt.verify(token, config.secret, function(err, decoded) {
				if (err) {
					return res.json({success: false, message: 'Bad token.'})
				} else {
					req.token = decoded
					next()
				}
			})
		} else {
			return res.status(403).send({success: false, message: 'No token.'})
		}
	}

}