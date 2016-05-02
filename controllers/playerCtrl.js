var models = require('../models/models.js')
var Player = models.Player

var bounce = function(res, msg) {
	res.json({success: false, message: msg})
}

var success = function(res, data) {
	data['success'] = true
	res.json(data)
}

module.exports = {

	create: function(req, res) {
		Player.create(req.body, function(err, doc) {
			if (err) bounce(res, 'Database error.')
			else     success(res, { player: doc, teams: req.body.teams })
		})
	},

	get: function(req, res) {
		Player.findById(req.params.id, function(err, doc) {
			if (err)  	bounce(res, 'Player not found.')
			else 	  	success(res, { player: doc })
		})
	},

	update: function(req, res) {
		Player.findByIdAndUpdate(req.body._id, req.body, {new: true}, 
		function(err, doc) {
			if (err)  	bounce(res, 'Player not found.')
			else 		success(res, { player: doc })
		})
	},

}