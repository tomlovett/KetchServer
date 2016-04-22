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
	apiRouter.route('/player/:id')
		.get(player.get)

	apiRouter.route('/player')
		.post(player.create)
		.put(player.update)

// Team routes
	apiRouter.route('/team/:id')
		.get(team.get)

	apiRouter.route('/team')
		.post(team.create)
		.put(team.update)

	apiRouter.route('/team/roster/:id')
		.get(team.roster)

	apiRouter.route('/team/rosterMove')
		.put(team.rosterMove)

	apiRouter.route('/team/playerTeams')
		.get(team.playerTeams)
		

// Game routes
	apiRouter.route('/game')
		.post(game.create)
		.put(game.update)

	return apiRouter

}