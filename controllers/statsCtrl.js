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

var winLoss = function(teamID, games) {
	var record = [0, 0]
	games.forEach(function(game) {
		var index = game.teams.indexOf(teamID)
		if (game.score[0] > game.score[1])	var winner = 0
		else								var winner = 1
		if (index == winner)	record[0] += 1
		else					record[1] += 1
	})
	return record
}

var aggregatePlayer = function(gameDocs, player) {
	var numGames  = 0
	var aggPoints = 0
	var aggDiff   = 0
	gameDocs.forEach(function(game) {
		numGames  += 1
		aggPoints += game.perf[player]['points']
		aggDiff   += game.perf[player]['+/-']
	})
	return { games: numGames, points: aggPoints, '+/-': aggDiff }
}

var aggregateTeam = function(gameDocs, roster) {
	var teamPerf = {}
	roster.forEach(function(player) {
		teamPerf[player] = { games: 0, points: 0, '+/-': 0 }
	})
	gameDocs.forEach(function(game) {
		roster.forEach(function(player) {
			if (game.perf[player]) {
				teamPerf[player]['games']  += 1
				teamPerf[player]['points'] += game.perf[player]['points']
				teamPerf[player]['+/-']    += game.perf[player]['+/-']
			} // I don't know why it has to be all bracket notation
		})		// but if it's dot notation it doesn't work
	})
	return teamPerf
}

module.exports = {

	teamCard: function(req, res) {

	},

	teamGames: function(req, res) {
		Game.find({ teams: { $in: [req.params.id] }}, function(err, docs) {
			// console.log('stats.teamGames -> err: ', err)
			// console.log('stats.teamGames -> docs: ', docs)
			if (err) 	bounce(res, err)
			else {
				var record = winLoss(req.params.id, docs)
				success(res, { games: docs, record: record })
			}
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

	playerPerf: function(req, res) {
		Game.find({ roster: { $in: [req.params.id] }}, function(err, docs) {
			if (err) 	bounce(res, err)
			else {
				var playerPerf = aggregatePlayer(docs, req.params.id)
				success(res, { perf: playerPerf })
			}
		})
	},

	teamPerf: function(req, res) {
		Game.find({ teams: { $in: [req.params.id] }}, function(err, docs) {
			if (err) 	bounce(res, err)
			else {
				var teamPerf = aggregateTeam(docs, req.body)	
				success(res, { perf: teamPerf })
			}
		})
	},

	gamePerf: function(req, res) {
		Game.findById(req.params.id, function(err, doc) {
			if (err)	bounce(res, err)
			else		success(res, { perf: doc.perf })
		})
	},

}