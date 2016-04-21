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
		// .get(player.me)
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

	// apiRouter.use('/game/:id', game.load)

	return apiRouter

}