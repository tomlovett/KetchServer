var player = require('./controllers/playerCtrl'),
	team   = require('./controllers/teamCtrl'),
	game   = require('./controllers/gameCtrl'),
	user   = require('./controllers/userCtrl'),
	auth   = require('./auth')

module.exports = function(app, express) {

	var apiRouter = express.Router()

// all non-auth requests above this line
	apiRouter.use(auth.decodeToken)

// Player routes
	apiRouter.route('/player')
		.get(player.me)
		.post(player.create)
		.put(player.update)

	apiRouter.use('/player/:id', player.load)

	apiRouter.route('/player/:id')
		.get(player.get)

// Team routes
	apiRouter.route('/team')
		.post(team.create)
		.put(team.update)

	apiRouter.use('/team/:id', team.load)
	apiRouter.route('/team/:id')
		.get(team.get)

	apiRouter.route('/team/playerTeams')
		.get(team.playerTeams)

// Game routes
	apiRouter.route('/game')
		.post(game.create)
		.put(game.update)

	apiRouter.use('/game/:id', game.load)

	apiRouter.route('/game/:id') // unnecessary?
		.put(game.point)

	return apiRouter

}