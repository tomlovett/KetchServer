var models = require('../models/models.js')
var Game = models.Game

var gameCtrl = {}

module.exports = {

	create: function(req, res) {
		Game.create({
			teamA : req.body.teamA,
			teamB : req.body.teamB || null,
		}, function(err, doc) {
			if (err)  res.send(err)
			else 	  res.send(doc._id)
		})
	},

	load: function(req, res) {
		Game.findById(req.params.id, function(err, doc) {
			if (err)  res.send(err)
			else {
				req.game = doc
				next()
			}
		})
	},

	point: function(req, res) {
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