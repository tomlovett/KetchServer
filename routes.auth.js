var player = require('./controllers/playerCtrl'),
	team   = require('./controllers/teamCtrl'),
	game   = require('./controllers/gameCtrl'),
	auth   = require('./auth')

module.exports = function(app, express) {

	var authRouter = express.Router()

	authRouter.post('/login',  auth.login)
	authRouter.post('/signup', auth.signup)

	authRouter.get('/tutorial', auth.tutorial)

	return authRouter
}