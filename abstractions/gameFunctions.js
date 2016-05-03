exp = {}

exp.newGame = function(team) {
	return {
		teams  : [team._id],
		score  : [0, 0],
		points : [],
		perf   : {},  // shortcut for playerPerformance stats
		rosters: [],  // shortcut for knowing whether a player was in a game
	}
}

var recordPerf = function(game, point) {
	point.line.forEach(function(player) {
		if (game.perf.player)	game.perf.player.points += 1
		else					game.perf.player = { points: 1, plusMinus: 0 }
		if (point.result)		game.perf.player.plusMinus += 1
		else					game.perf.player.plusMinus -= 1
	})
}

exp.recordPoint = function(game, point) {
	if (point.result)		doc.score[0] += 1
	else				  	doc.score[1] += 1
	game.points.push(point)
	recordPerf(game, point)
	return game
}
exp.gameRoster = function(game) {
	game.points.forEach(function(point) {
		point.line.forEach(function(player) {
			if (game.roster.indexOf(player) == -1)
				game.roster.push(player)
		})
	})
	return game
}

/*
Abstracting this functions to a separate module will be really great, but right now I have to work on the stats portion of the app.
I'm blueprinting this now to be fleshed out later.
*/

module.exports = exp