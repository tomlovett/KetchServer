var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')

var ObjectId = mongoose.Schema.Types.ObjectId

var userSchema = new mongoose.Schema({
	email   : String,
	password: String,
	player  : ObjectId,
})

var playerSchema = new mongoose.Schema({
	first  : String,
	last   : String,
	handles: Array,
	gender : String,
	linked : Boolean,
})

var teamSchema = new mongoose.Schema({
	name    : String,
	short   : String,
	color1  : String,
	color2  : String,
	roster  : [{ type: ObjectId, ref: 'Player'}],
	captains: [{ type: ObjectId, ref: 'Player'}],
	misc    : Object
})

var gameSchema = new mongoose.Schema({
	teams  : [ObjectId],
	rosters: [ObjectId],
	points : Array,
	score  : Array,
	misc   : Object
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

userSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

var send = function(err, doc, req, res) {
	console.log('send fired')
	console.log('req, res: ', req, res)
	console.log('err, doc:', err, doc)
	if (err)   	res.send(err)
	else		res.send(doc)
}

module.exports = {
	User  : mongoose.model('User',   userSchema),
	Player: mongoose.model('Player', playerSchema),
	Team  : mongoose.model('Team',   teamSchema),
	Game  : mongoose.model('Game',   gameSchema),
	send  : send
}