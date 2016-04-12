var models = require('../models/models.js')
var Team = models.Team

var teamCtrl = {}

teamCtrl.create = function(req, res) {
	Team.create({
		name: req.body.name,
		color1  : req.body.color1,
		color2  : req.body.color2,
		roster  : req.body.roster,
		captains: req.body.captains

	}, function(err, doc) {
		if (err) res.send(err)
		else     res.send(doc)
	}
}

teamCtrl.load = function(req, res, next) {
	Team.findById(req.params.id, function(err, doc) {
		if (err) res.send(err)
		else {
			req.team = doc
			next()
		}
	})
}

teamCtrl.get = function(req, res) {
	res.send(req.team)
}

teamCtrl.update = function(req, res) {
	var data = req.body.team
	if (data.name)     req.team.name     = data.name
	if (data.color1)   req.team.color1   = data.color1
	if (data.color2)   req.team.color2   = data.color2
	if (data.roster)   req.team.roster   = data.roster
	if (data.captains) req.team.captains = data.captains
	req.team.save(function(err, doc) {
		if (err) res.send(err)
		else res.send(doc)
	})
}

teamCtrl.playerTeams = function(req, res) {
	'return all teams player is on'
}

module.exports = teamCtrl