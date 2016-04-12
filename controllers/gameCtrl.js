var models = require('../models/models.js')
var Game = models.Game

var gameCtrl = {}

gameCtrl.create = function(req, res) {
	'create new game'
}

gameCtrl.load = function(req, res) {
	'load game: send err or assign to req.game'
}

gameCtrl.point = function(req, res) {
	'record new point'
}

gameCtrl.update = function(req, res) {
	'some other updating bullshit'
}

module.exports = gameCtrl