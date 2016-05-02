var models = require('../models/models.js')
var Game = models.Game

var bounce = function(res, msg) {
	res.json({success: false, message: msg})
}

var success = function(res, data) {
	data['success'] = true
	res.json(data)
}

var gameRoster = function(game) {
	game.points.forEach(function(point) {
		point.line.forEach(function(player) {
			if (game.roster.indexOf(player) == -1)
				game.roster.push(player)
		})
	})
}

var newGameDoc = function(team) {
	return {
		teams: [team._id],
		score: [0, 0],
		points: [],
		rosters: []
	}
}

module.exports = {

	create: function(req, res) {
		var newGame = newGameDoc(req.body.team)
		Game.create(newGame, function(err, doc) {
			if (err)  bounce(res, 'Database error.')
			else 	  success(res, { game: doc })
		})
	},

	update: function(req, res) {
		Game.findByIdAndUpdate(req.body._id, req.body, {new: true},
		function(err, doc) {
			if (err)	bounce(res, 'Database error.')
			else 		success(res, { game: doc })
		})
	},

	get: function(req, res, next) {
		Game.findById(req.params.id, function(err, gameDoc) {
			if (err)  	bounce(res, err)
			else 		success(res, { game: gameDoc })
		})
	},

	undoPoint: function(req, res) {
		Game.findById(req.params.id, function(err, gameDoc) {
			if (err) 	bounce(res, err)
			else {
				var point = gameDoc.points.pop()
				if (point.result)   gameDoc.score[0] -= 1
				else 				gameDoc.score[1] -= 1
				gameDoc.save(function(errTwo, newDoc) {
					if (errTwo)	bounce(res, err)
					else		success(res, { game: newDoc })
				})
			}
		})
	},

	close: function(req, res) {
		Game.findById(req.params.id, function(err, gameDoc) {
			if (err)	bounce(res, err)
			else {
				gameRoster(gameDoc)
				gameDoc.save(function(errTwo, newDoc) {
					if (err)	bounce(res, err)
					else		success(res, {})
				})
			}
		})
	}

}