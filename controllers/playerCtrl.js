var models = require('../models/models.js')
var Player = models.Player

module.exports = {

	create: function(req, res) {
		Player.create({
			first  : req.body.first,
			last   : req.body.last,
			handles: req.body.handles,
			gender : req.body.gender,
			email  : req.body.email,
		}, function(err, doc) {
			if (err) res.send(err)
			else     res.send(doc)
		})
	},

	load: function(req, res, next) {
		console.log('req.params.id: ', req.params.id)
		Player.findByID(req.params.id, function(err, doc) {
			if (err)  res.send(err) // handle not found; but should never happen
			else {
				req.player = doc
				next()
			}
		})
	},

	get: function(req, res) {
		res.send(req.player)
	},

	update: function(req, res) {
		var data = req.body.player
		if (data.first)   req.player.first   = data.first
		if (data.last)    req.player.last    = data.last
		if (data.handles) req.player.handles = data.handles
		if (data.email)   req.player.email   = data.email
		req.player.save()
		// callback to send player back to client
	},

}