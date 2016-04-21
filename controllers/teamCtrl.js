var models = require('../models/models.js')
var Team = models.Team

module.exports = {

	checkCaptain: function(req, res, next) {
		if (req.user in req.team.captains)  { next() } // not final
		else res.status(403).send('Permission denied: not a captain.')
	},

	create: function(req, res) {
		Team.create({
			name    : req.body.name,
			color1  : req.body.color1,
			color2  : req.body.color2,
			roster  : [req.token.player],
			captains: [req.token.player]
		}, function(err, doc) {
			if (err) res.send(err)
			else     {
				console.log('createTeam -> doc: ', doc)
				res.send(doc)
			}
		})
	},

	load: function(req, res, next) {
		Team.findById(req.params.id, function(err, doc) {
			if (err) res.send(err)
			else {
				req.team = doc
				next()
			}
		})
	},

	get: function(req, res) {
		res.send(req.team)
	},

	update: function(req, res) {
		var data = req.body.team
		if (data.name)     req.team.name     = data.name
		if (data.color1)   req.team.color1   = data.color1
		if (data.color2)   req.team.color2   = data.color2
		if (data.roster)   req.team.roster   = data.roster
		if (data.captains) req.team.captains = data.captains
		req.team.save(function(err, doc) {
			if (err) res.send(err)
			else 	 res.send(doc)
		})
	},

	roster: function(req, res) {
		Team.findById(req.params.id).select('roster').populate('roster')
			.exec(function(err, team) {
				if (err)	res.send(err)
				else		res.send(team.roster)
			})
	},

	playerTeams: function(req, res) {
		Team.find().where('roster').in([req.token.player])
			.exec(function(err, docs) {
				res.send(err || docs)
			})
	},

	rosterMove: function(req, res) {
		Team.findById(req.body.team, function(err, team) {
			if (req.body.add) {
				team.roster.push(req.body.player)
			} else {
				var index = team.roster.indexOf(req.body.player)
				team.roster.splice(index, 1)
			}
			team.save(function(err, doc) {
				if (err)	res.send(err)
				else		res.send(doc)
			})
		})
	},

}