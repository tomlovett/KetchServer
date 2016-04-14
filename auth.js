var jwt    = require('jsonwebtoken')
var config = require('./config.js')

module.exports = {
	tutorial: function(req, res) {
		res.json({message: 'tutorial!'})
	},

	newUser : function(req, res) {
		res.json({message: 'newUser!'})
	},
	
	giveToken : function(req, res) {
		console.log('fired giveToken')
		// page 100
		// check password,  give token or call error
		// other auth methods
		// unlinked tokens for non sign-ins
		var token = jwt.sign({ user: 'user' }, config.secret)
		res.json({ success: true, token: token })
	},

	decodeToken : function(req, res, next) {
		console.log('authenticating...')
		var token = req.body.token || req.headers['x-access-token']
		if (token) {
			jwt.verify(token, config.secret, function(err, decoded) {
				if (err) {
					return res.json({success: false, message: 'Failed to authenticate token.'})
				} else {
					req.user = decoded.user
					next()
				}
			})
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			})
		}
	}

}