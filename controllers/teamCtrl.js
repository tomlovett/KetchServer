var models = require('../models/models.js')
var Team = models.Team

var teamCtrl = {}

teamCtrl.create = function(req, res) {
	''
}

teamCtrl.load = function(req, res) {
	'load team: send err or assign to req.team'
}

teamCtrl.get = function(req, res) {
	''
}

teamCtrl.update = function(req, res) {
	''
}

teamCtrl.playerTeams = function(req, res) {
	'return all teams player is on'
}

module.exports = teamCtrl