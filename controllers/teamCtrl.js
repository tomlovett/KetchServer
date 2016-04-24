var models = require('../models/models.js')
var Team = models.Team

var bounce = function(res, msg) {
	res.json({success: false, message: msg})
}

var success = function(res, data) {
	data['success'] = true
	res.json(data)
}

module.exports = {

	checkCaptain: function(req, res, next) {
		if (req.user in req.team.captains)  { next() } // not final
		else res.status(403).send('Permission denied: not a captain.')
	},

	create: function(req, res) {
		req.body.roster   = [req.token.player]
		req.body.captains = [req.token.player]
		Team.create(req.body, function(err, teamDoc) {
			if (err) 	bounce(res, err)
			else     	success(res, { team: teamDoc })
		})
	},

	get: function(req, res, next) {
		Team.findById(req.params.id, function(err, teamDoc) {
			if (err)  	bounce(res, err)
			else 		success(res, { team: teamDoc })
		})
	},

	update: function(req, res) {
		Team.findByIdAndUpdate(req.body._id, req.body, {new:true},
			function(err, teamDoc) {
				if (err) 	bounce(res, err)
				else 	 	success(res, { team: teamDoc })
			})
		// var data = req.body.team
		// if (data.name)     req.team.name     = data.name
		// if (data.color1)   req.team.color1   = data.color1
		// if (data.color2)   req.team.color2   = data.color2
		// if (data.roster)   req.team.roster   = data.roster
		// if (data.captains) req.team.captains = data.captains
		// req.team.save(function(err, teamDoc) {
		// 	if (err) 	bounce(res, err)
		// 	else 	 	success(res, { team: teamDoc })
		// })
	},

	roster: function(req, res) {
		Team.findById(req.params.id).select('roster').populate('roster')
			.exec(function(err, teamDoc) {
				if (err)	bounce(res, err)
				else		success(res, { roster: teamDoc.roster })
			})
	},

	playerTeams: function(req, res) {
		Team.find().where('roster').in([req.token.player])
			.exec(function(err, teamDocs) {
				if (err)	bounce(res, err)
				else		success(res, { teams: teamDocs })
			})
	},

	rosterMove: function(req, res) {
		Team.findById(req.body.team, function(err, team) {
			if (err)	bounce(res, err)
			else {
				if (req.body.add) 	team.roster.push(req.body.player)
				else {
					var index = team.roster.indexOf(req.body.player)
					team.roster.splice(index, 1)
				}
				// test replacing this section with addOrDrop
			}
			team.save(function(err, teamDoc) {
				if (err)	bounce(res, err)
				else		success(res, { team: teamDoc })
			})
		})
	},

}