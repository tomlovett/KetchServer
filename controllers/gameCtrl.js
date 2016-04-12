var models = require('../models/models.js')
var Game = models.Game

var gameCtrl = {}

gameCtrl.create = function(req, res) {
	Game.create({
		teamA : req.body.teamA,
		teamB : req.body.teamB || null,
	}, function(err, doc) {
		if (err)  res.send(err)
		else 	  res.send(doc)
	})
}

gameCtrl.load = function(req, res) {
	Game.findById(req.params.id, function(err, doc) {
		if (err)  res.send(err)
		else {
			req.game = doc
			next()
		}
	})
}

gameCtrl.point = function(req, res) {
	req.game.points.push(req.body.point)
	req.game.save()
		.exec(function(doc) { res.send(doc) })
}

gameCtrl.update = function(req, res) {
	'some other updating bullshit'
}

module.exports = gameCtrl