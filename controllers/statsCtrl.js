var models = require('../models/models.js')
var Player = models.Player
var Team   = models.Team
var Game   = models.Game

var bounce = function(res, msg) {
	res.json({success: false, message: msg})
}

var success = function(res, data) {
	data['success'] = true
	res.json(data)
}

var bothIn = function(arr, itemA, itemB) {
	return (arr.indexOf(itemA) !== -1 && arr.indexOf(itemB) !== -1)
}

var formatGame = function(game) {
	var total     = {}
	var plusMinus = {}
	game.roster.forEach(function(playerID) {
		total[playerID]     = 0
		plusMinus[playerID] = 0
	})
	console.log('total & plusMinus generated')
	game.points.forEach(function(point) {
		if (point.result)   var outcome = 1
		else				var outcome = -1
		// stats formatting
		point.line.forEach(function(playerID) {
			total.playerID     += 1
			plusMinus.playerID += outcome
		})
	})
	return { game: game, total: total, plusMinus: plusMinus }
}

module.exports = {

	game: function(req, res) {
		Game.findById(req.params.id, function(err, game) {
			console.log('stats.game -> err: ', err)
			console.log('stats.game -> game: ', game)
			if (err)	bounce(res, err)
			else 		success(res, formatGame(game))
		})
	},

	teamGames: function(req, res) {
		Game.find({ teams: { $in: [req.params.id] }}, function(err, docs) {
			console.log('stats.teamGames -> err: ', err)
			console.log('stats.teamGames -> docs: ', docs)
			if (err) 	bounce(res, err)
			else		success(res, { games: docs })
		})
	},

	playerGames: function(req, res) {
		Game.find({ roster: { $in: [req.params.id] }}, function(err, docs) {
			console.log('stats.teamGames -> err: ', err)
			console.log('stats.playerGames -> docs: ', docs)
			if (err) 	bounce(res, err)
			else		success(res, { games: docs })
		})
	},

	teamPoints: function(req, res) {
		Game.find({ teams: { $in: [req.params.id] }}, function(err, docs) {
			console.log('stats.teamGames -> err: ', err)
			console.log('stats.teamGames -> docs: ', docs)
			if (err) 	bounce(res, err)
			else {
				var points = []
				docs.forEach(function(game) {
					points.concat(game.points)
				})
				success(res, { points: points })
			}
		})
	},

	playerPoints: function(req, res) {
		var playerID = req.params.id
		Game.find({ roster: { $in: [playerID] }}, function(err, docs) {
			console.log('stats.teamGames -> err: ', err)
			console.log('stats.playerGames -> docs: ', docs)
			if (err) 	bounce(res, err)
			else {
				console.log('playerPoints docs found; processing...')
				var points = []
				docs.forEach(function(game) {
					game.points.forEach(function(point) {
						if (point.line.indexOf(playerID) !== -1)
							points.push(point)
					})
				})
				success(res, { points: points })
			}
		})
	},

	gamesWith: function(req, res) {
		var friendA = req.params.friendA
		var friendB = req.params.friendB
		Game.find({ roster: { $in: [friendA, friendB] }}, function(err, docs) {
			if (err)	bounce(res, err)
			else {
				var games = []
				docs.forEach(function(game) {
					if ( bothIn(game.roster, friendA, friendB) )
						games.push(game)
				})
				success(res, { games: games })
			}
		})
	},

	pointsWith: function(req, res) {
		var friendA = req.params.friendA
		var friendB = req.params.friendB
		Game.find({ roster: { $in: [friendA, friendB] }}, function(err, docs) {
			if (err)	bounce(res, err)
			var points = []
			docs.forEach(function(game) {
				game.points.forEach(function(point) {	
					if ( bothIn(point.line[0], friendA, friendB) || 
						 bothIn(point.line[1], friendA, friendB) )
						points.push(point)
				})
			})
			success(res, { points: points })
		})
	},
	// pointsVersus built off this; same idea, both on at same time but in different lines

}