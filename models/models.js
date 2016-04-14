var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

module.exports = {

	Player: mongoose.Schema({
		first   : String,
		last    : String,
		handles : Array,
		gender  : String,
		email   : { type: String, unique: true },
		password: { type: String, select: false }
	}),

	Team: mongoose.Schema({
		name    : String,
		color1  : String,
		color2  : String,
		roster  : Array,
		captains: Array,
		misc    : {}
	}),

	Game: mongoose.Schema({
		teams  : [],
		rosters: [],
		points : [],
		score  : [0, 0],
		misc   : {}
	}),

	// playerSchema.pre('save', function(next) {
	// 	if (!this.isModified('password')) return next()
	// 	bcyrpt.hash(user.password, null, null, function(err, hash) {
	// 		if (err) return next(err)
	// 		user.password = hash
	// 		next()
	// 	})
	// })

	// playerSchema.methods.comparePassword = function(password) {
	// 	return bcrypt.compareSync(password, this.password)
	// }

	send : function(err, doc) {
		if (err)   	res.send(err)
		else		res.send(doc)
		// db error
		// send doc
			// accessing req & res like (err, doc)(req, res) ?
	}

}