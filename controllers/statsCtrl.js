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

module.exports = {

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


}