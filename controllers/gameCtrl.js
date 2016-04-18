var models = require('../models/models.js')
var Game = models.Game

module.exports = {

	create: function(req, res) {
		Game.create({  // req.body
			teamA : req.body.teamA,
			teamB : req.body.teamB || null,
		}, function(err, doc) {
			if (err)  res.json({success: false, message: 'Database error.'})
			else 	  res.json({success: true,  game: doc})
		})
	},

	load: function(req, res) {
		Game.findById(req.params.id, function(err, doc) {
			if (err)  res.json({success: false, message: 'Database error.'})
			else {
				req.token.game = doc
				next()
			}
		})
	},

	point: function(req, res) {
		// simply updating the doc, right?
		req.game.points.push(req.body.point)
		req.game.save()
			.exec(function(doc) { res.send(doc) })
	},

	update: function(req, res) {
		// updating other data
		// check to close game
		// if (req.body.close) closeGame()
	}

}