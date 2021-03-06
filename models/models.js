var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')

var ObjectId = mongoose.Schema.Types.ObjectId

var userSchema = new mongoose.Schema({
	email   : String,
	password: String,
	player  : { type: ObjectId, ref: 'Player' },
})

var playerSchema = new mongoose.Schema({
	first  : String,
	last   : String,
	handle : String,
	gender : String,
	alias  : String, // "tangential scorned panda"
	linked : Boolean,
})

var teamSchema = new mongoose.Schema({
	name     : String,
	short    : String,
	alias    : String, // "tangential scorned panda"
	primary  : String,
	secondary: String,
	roster   : [{ type: ObjectId, ref: 'Player' }],
	captains : [{ type: ObjectId, ref: 'Player' }],
	misc     : Object,
})

var gameSchema = new mongoose.Schema({
	teams : [{ type: ObjectId, ref: 'Team'   }],
	roster: [{ type: ObjectId, ref: 'Player' }],
	points: Array,
	score : Array,
	perf  : Object,
	misc  : Object
})

userSchema.pre('save', function(next) {
	var user = this
	if (!this.isModified('password')) return next()
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err)
		user.password = hash
		next()
	})
})

userSchema.methods.check = function(password) {
	return bcrypt.compareSync(password, this.password)
}

module.exports = {
	User  : mongoose.model('User',   userSchema),
	Player: mongoose.model('Player', playerSchema),
	Team  : mongoose.model('Team',   teamSchema),
	Game  : mongoose.model('Game',   gameSchema),
}