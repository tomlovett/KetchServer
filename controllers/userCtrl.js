var models = require('../models/models.js')
var jwt    = require('jsonwebtoken')
var config = require('../config')
var User   = models.User
// var Player = models.Player

/* 
none of this is being used.
can almost surely delete this file later; except for future, more well-rounded functionality
*/

var bounce = function(res, msg) {
	res.json({success: false, message: msg})
}

var success = function(res, data) {
	data['success'] = true
	res.json(data)
}

module.exports = {

	linkEmail: function(req, res) {
		// { player: ObjectId, email: email }
		// create without password
	},

	userify: function(req, res) {
		// { player: ObjectId, email: 'butts@google.com' }
		// turn existing player into user
		// new User with User.player
		// verifiying?
		Player.update('User.player', { linked: true })
	},

	// newUser: function(req, res) {
	// 	User.create(req.body, function(err, doc) {
	// 		if (err)    bounce(res, 'Failed to create user.')
	// 		else		res.json({success: true,  user: doc}) // or token
	// 	})
	// },

}