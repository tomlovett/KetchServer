var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var playerSchema = mongoose.Schema({
	first: String,
	last: String,
	handles: Array,
	gender: String,
	email : { type: String, unique: true },
	password: { type: String, select: false }
})

var teamSchema = mongoose.Schema({
	name: String,
	color1: String,
	color2: String,
	roster: Array,
	captains: Array,
	misc: {}
})

var gameSchema = mongoose.Schema({
	teamA: String,
	teamB: String,
	rosterA: [],
	rosterB: [],
	points: [],
	score: [0, 0],
	misc: {}
})

playerSchema.pre('save', function(next) {
	if (!this.isModified('password')) return next()
	bcyrpt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err)
		user.password = hash
		next()
	})
})

playerSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

module.exports = {
	Player: playerSchema,
	Team  : teamSchema,
	Game  : gameSchema
}