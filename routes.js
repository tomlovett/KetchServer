var player = require('./controllers/playerCtrl')
var team = require('./controllers/teamCtrl')
var game = require('./controllers/gameCtrl')

var config = require('./config')
var secret = config.secret

module.exports = function(app, express) {

	var apiRouter = express.Router()

	apiRouter.post('/auth', config.auth)


// all non-auth requests above this line
	apiRouter.use(config.decodeToken)

	apiRouter.use('/player/:id', function() {'load player'})
	apiRouter.use('/team/:id', function() {'load team'})
	apiRouter.use('/game/:id', function() {'load game'})



	apiRouter.route('/player')
		.post(player.create) // create player

	apiRouter.use('/player/:id', player.load)

	apiRouter.route('/player/:id')
		.get(player.get) // load player data
		.put(player.update) // update player

	apiRouter.route('/player/teams/:id')
		.get(team.playerTeams)

	apiRouter.route('/team')
		.post(team.create) // create team

	apiRouter.use('/team/:id', team.load)

	apiRouter.route('/team/:id')
		.get(team.get) // load team data
		.put(team.update) // update team

	apiRouter.route('/game')
		.post(game.create) // init new game

	apiRouter.use('/game/:id', game.load)

	apiRouter.route('/game/:id')
		.put(game.update) // update game
		.post(game.point) // post new point

	apiRouter.use('/captain', function() {'authCaptain()'})

}