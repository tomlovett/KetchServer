var models = require('../models/models.js')
var Player = models.Player

var playerCtrl = {}

playerCtrl.create = function(req, res) {
	Player.create({
		first: req.body.first,
		last : req.body.last,
		handles: req.body.handles
		gender: req.body.gender
		email: req.body.email
	})
}

playerCtrl.load = function(req, res, next) {
	Player.findByID(req.params.id, function(err, doc) {
		if (err)  res.send(err)
		else {
			req.player = doc
			next()
		}
	})
}

playerCtrl.get = function(req, res) {
	res.send(req.player)
}

playerCtrl.update = function(req, res) {
	var data = req.body.player
	if (data.first)   req.player.first   = data.first
	if (data.last)    req.player.last    = data.last
	if (data.handles) req.player.handles = data.handles
	if (data.email)   req.player.email   = data.email
	req.player.save() // syntax
}

module.exports = playerCtrl