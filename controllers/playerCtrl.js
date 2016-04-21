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

	// load: function(req, res, next) {
	// 	Player.findById(req.params.id, function(err, doc) {
	// 		if (err)  res.json({success: false, message: 'Player not found.'})
	// 		else {
	// 			req.player = doc
	// 			next()
	// 		}
	// 	})
	// },

	// me: function(req, res) {
	// 	Player.findById(req.token.player, function(err, doc) {
	// 		if (err)  res.json({success: false, message: 'Player not found.'})
	// 		else {
	// 			res.json({success: true, player: doc})
	// 		}
	// 	})
	// },

	get: function(req, res) {
		Player.findById(req.params.id, function(err, doc) {
			if (err)  res.json({success: false, message: 'Player not found.'})
			else 	  res.send(doc)
		})
	},

	update: function(req, res) {
		console.log('player.update -> req.body: ', req.body)
		Player.findByIdAndUpdate(req.body._id, req.body, {new: true}, 
		function(err, doc) {
			if (err)  res.json({success: false, message: 'Player not found.'})
			else {
				console.log('player.update -> doc: ', doc)
				res.json({success: true, player: doc})
			}
		})
	},

}