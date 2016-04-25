var models = require('../models/models.js')
var Game = models.Game

var bounce = function(res, msg) {
	res.json({success: false, message: msg})
}

var success = function(res, data) {
	data['success'] = true
	res.json(data)
}

module.exports = {

	create: function(req, res) {
		Game.create(req.body, function(err, doc) {
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

}