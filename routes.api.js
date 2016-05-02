var player = require('./controllers/playerCtrl'),
	team   = require('./controllers/teamCtrl'),
	game   = require('./controllers/gameCtrl'),
	user   = require('./controllers/userCtrl'),
	stats  = require('./controllers/statsCtrl'),
	auth   = require('./auth')

module.exports = function(app, express) {

	var apiRouter = express.Router()

// all non-auth requests above this line
	apiRouter.use(auth.decodeToken)

// Player routes
	apiRouter.route('/player')
		.post(player.create)
		.put(player.update)

	apiRouter.route('/player/:id')
		.get(player.get)
		
// Team routes
	apiRouter.route('/team')
		.post(team.create)
		.put(team.update)

	apiRouter.route('/team/roster/:id')
		.get(team.roster)

	apiRouter.route('/team/rosterMove')
		.put(team.rosterMove)

	apiRouter.route('/team/playerTeams')
		.get(team.playerTeams)
		
	apiRouter.route('/team/:id')
		.get(team.get)

// Game routes
	apiRouter.route('/game')
		.post(game.create)
		.put(game.update)

	apiRouter.route('/game/close/:id')
		.get(game.close)

	apiRouter.route('/game/undoPoint/:id')
		.get(game.undoPoint)

	apiRouter.route('/game/:id')
		.get(game.get)

// Stats routes
	apiRouter.route('/stats/game/:id')
		.get(stats.game)	

	apiRouter.route('/stats/team/games/:id')
		.get(stats.teamGames)
	apiRouter.route('/stats/team/points/:id')
		.get(stats.teamPoints)

	apiRouter.route('/stats/player/games/:id')
		.get(stats.playerGames)
	apiRouter.route('/stats/player/points/:id')
		.get(stats.playerPoints)

	apiRouter.route('/stats/gamesWith/:team/:player')
		.get(stats.gamesWith)
	apiRouter.route('/stats/pointsWith/:team/:player')
		.get(stats.pointsWith)

	// apiRouter.route('/stats/friends/:friendA/:friendB')
		// .get(stats.friends) // can make big, modular; sweet idea though


	return apiRouter

}