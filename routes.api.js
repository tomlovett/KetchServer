var player = require('./controllers/playerCtrl'),
	team   = require('./controllers/teamCtrl'),
	game   = require('./controllers/gameCtrl'),
	auth   = require('./auth')

module.exports = function(app, express) {

	var apiRouter = express.Router()

// all non-auth requests above this line
	apiRouter.use(auth.decodeToken)

// Player routes
	apiRouter.route('/player')
		.post(player.create)

	apiRouter.use('/player/:id', player.load)
	apiRouter.route('/player/:id')
		.get(player.get)
		.put(player.update)

// Team routes
	apiRouter.route('/team')
		.post(team.create)

	apiRouter.use('/team/:id', team.load)
	apiRouter.route('/team/:id')
		.get(team.get)
		.put(team.update)

	apiRouter.route('/player/teams')
		.get(team.playerTeams)

// Game routes
	apiRouter.route('/game')
		.post(game.create)

	apiRouter.use('/game/:id', game.load)
	apiRouter.route('/game/:id')
		.put(game.point)
		.post(game.update)

	return apiRouter

}