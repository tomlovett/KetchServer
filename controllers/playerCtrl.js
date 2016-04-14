var models = require('../models/models.js')
// console.log('models.Player: ', models.Player)
var Player = models['Player']

module.exports = {

	create: function(req, res) {
		Player.create({
			first  : req.body.first,
			last   : req.body.last,
			handles: req.body.handles,
			gender : req.body.gender,
		}, function(err, doc) {
			if (err) res.send(err)
			else     res.send(doc)
		})
	},

	load: function(req, res, next) {
		Player.findById(req.params.id, function(err, doc) {
			console.log('got to here')
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