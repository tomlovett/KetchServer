var models   = require('../models/models.js')
var Game     = models.Game
var gameFunc = require('../abstractions/gameFunctions.js') // later

var bounce = function(res, msg) {
	res.json({success: false, message: msg})
}

var success = function(res, data) {
	data['success'] = true
	res.json(data)
}

var closeGame = function(game) {
	if (!game.perf) {
		game.perf = {}
		console.log('perf created in closeGame')
	} // should be able to remove; a workaround for an old database issue
	game.points.forEach(function(point) {
		if (point.result) 	var result = 1
		else				var result = -1
		point.line.forEach(function(player) {
			if (!game.perf[player]) {
				game.perf[player] = { points: 0, '+/-': 0 }
			}
			game.perf[player]['points'] += 1
			game.perf[player]['+/-']    += result
		})
	})
	for (var playerID in game.perf) {
		game.roster.push(playerID)
	}
}

var newGameDoc = function(team) {
	return {
		teams  : [team._id],
		score  : [0, 0],
		points : [],
		perf   : {},  // shortcut for playerPerformance stats
		rosters: [],  // shortcut for knowing whether a player was in a game
	}
}

var recordPerf = function(game, point) {
	point.line.forEach(function(player) {
		console.log('recordPerf -> player: ', player)
		if (game.perf[player])	game.perf.player.points += 1
		else					game.perf[player] = { points: 1, plusMinus: 0 }
		if (point.result)		game.perf.player.plusMinus += 1
		else					game.perf.player.plusMinus -= 1
	})
}

var recordPoint = function(game, point) {
	if (point.result)		game.score[0] += 1
	else				  	game.score[1] += 1
	game.points.push(point)
	recordPerf(game, point)
}

module.exports = {

	create: function(req, res) {
		var newGame = newGameDoc(req.body.team)
		Game.create(newGame, function(err, doc) {
			if (err)  bounce(res, 'Database error.')
			else 	 {
				console.log('create -> doc: ', doc)
				success(res, { game: doc })
			}
		})
	},

	get: function(req, res, next) {
		Game.findById(req.params.id, function(err, doc) {
			if (err)  	bounce(res, err)
			else 		success(res, { game: doc })
		})
	},

	update: function(req, res) {
		Game.findByIdAndUpdate(req.body._id, req.body, {new: true},
		function(err, doc) {
			if (err)	bounce(res, 'Database error.')
			else 		success(res, { game: doc })
		})
	},

	point: function(req, res) {
		Game.findById(req.params.id, function(err, doc) {
			if (err) 	bounce(res, err)
			else {
				recordPoint(doc, req.body)
				doc.save(function(newErr, newDoc) {
					if (newErr)		bounce(res, newErr)
					else			success(res, { game: newDoc })
				})
			}
		})
	},

	undoPoint: function(req, res) {
		Game.findById(req.params.id, function(err, gameDoc) {
			if (err) 	bounce(res, err)
			else {
				var point = gameDoc.points.pop()
				if (point.result)   gameDoc.score[0] -= 1
				else 				gameDoc.score[1] -= 1
				gameDoc.save(function(newErr, newDoc) {
					if (newErr)	bounce(res, newErr)
					else		success(res, { game: newDoc })
				})
			}
		})
	},

	close: function(req, res) {
		Game.findById(req.params.id, function(err, gameDoc) {
			if (err)	bounce(res, err)
			else {
				closeGame(gameDoc)
				gameDoc.save(function(newErr, newDoc) {
					if (newErr)	bounce(res, err)
					else		success(res, newDoc)
				})
			}
		})
	}

}