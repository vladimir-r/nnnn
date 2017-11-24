var mongoose = require('mongoose');
var crypto = require('crypto');
mongoose.connect('mongodb://admin:123456@ds115166.mlab.com:15166/boot', { useMongoClient: true });
mongoose.Promise = global.Promise;


var User = require('./db/models/user.js')

// User API

exports.createUser = function(userData){
	var user = {
		username: userData.name,
		useremail: userData.email,
		password: hash(userData.password)
	};
	//console.log(111);
	return new User(user).save()
}

exports.getUser = function(id) {
	return User.findOne(id)
}

exports.checkUser = function(userData) {
	return User
		.findOne({useremail: userData.email})
		.then(function(doc){
			if ( doc.password == hash(userData.password) ){
				console.log("User password is ok");
				return Promise.resolve(doc)
			} else {
				return Promise.reject("Error wrong")
			}
		})
}


// хешируем пароль что бы добавить в базу данных хеш, а не сам пароль
function hash(text) {
	return crypto.createHash('sha1')
	.update(text).digest('base64')
}

