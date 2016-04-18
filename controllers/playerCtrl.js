var models = require('../models/models.js')
var Player = models.Player

module.exports = {

	create: function(req, res) {
		Player.create({ // or req.body
			first  : req.body.first,
			last   : req.body.last,
			handles: req.body.handles,
			gender : req.body.gender,
		}, function(err, doc) {
			if (err) res.json({success: false, message: 'Database error.'})
			else     res.json({success: true,  player: doc, teams: req.body.teams})
		})
	},

	load: function(req, res, next) {
		Player.findById(req.params.id, function(err, doc) {
			console.log('got to here')
			if (err)  res.json({success: false, message: 'Player not found.'})
			else {
				req.player = doc
				next()
			}
		})
	},

	me: function(req, res) {
		Player.findById(req.token.player, function(err, doc) {
			if (err)  res.json({success: false, message: 'Player not found.'})
			else {
				res.json({success: true, player: doc})
			}
		})
	},

	get: function(req, res) {
		res.send(req.player)
	},

	update: function(req, res) {
		Player.update(req.body, function(err, doc) {
			if (err)  res.json({success: false, message: 'Player not found.'})
			else {
				res.json({success: true, player: doc})
			}
		}) // double-check syntax
		// var data = req.body.player
		// if (data.first)   req.player.first   = data.first
		// if (data.last)    req.player.last    = data.last
		// if (data.handles) req.player.handles = data.handles
		// if (data.email)   req.player.email   = data.email
		// req.player.save()
		// // callback to send player back to client
	},

}