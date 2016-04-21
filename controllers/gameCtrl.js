var models = require('../models/models.js')
var Game = models.Game

module.exports = {

	create: function(req, res) {
		Game.create(req.body, function(err, doc) {
			if (err)  res.json({success: false, message: 'Database error.'})
			else 	  res.json({success: true,  game: doc})
		})
	},

	load: function(req, res) {
		Game.findById(req.params.id, function(err, doc) {
			if (err)  res.json({success: false, message: 'Database error.'})
			else {
				req.game = doc
				// next()
			}
		})
	},

	update: function(req, res) {
		Game.findByIdAndUpdate(req.body._id, req.body, {new: true},
		function(err, doc) {
			if (err)	res.send(err)
			else 		res.send(doc)
		})
	},

}