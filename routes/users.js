var express = require('express');
var router = express.Router();
var api = require('../api.js');

/* Создание пользователя */
router.post('/login', function(req, res, next) {
	if (req.session.user) return res.redirect('/')

	api.checkUser(req.body)
		.then(function(user){
			if(user){
				
				
				req.session.user = {id: user._id, name: user.name}
				res.redirect('/')
			} else {
				return next(error)
			}
		})
		.catch(function(error){
			return next(error)
		})

});

router.post('/', function(req, res, next) {
	//console.log(req.body);
  
  api.createUser(req.body).then(function(result){
  		console.log("User created");
		var hour = 60000;
	req.session.cookie.expires = new Date(Date.now() + hour);
	req.session.cookie.maxAge = hour;
  		req.session.user=result;
		
		res.render('index',{user:result.username})
		
  	}).catch(function(err){
  		if (err.toJSON().code == 11000){
  			res.status(500).send("This email already exist")
  		}
		console.log(err)
		
  	})
	
	
});

router.get('/logout', function(req, res, next) {
	if (req.session.user) {
		delete req.session.user;
		res.redirect('/')
	}
});

module.exports = router;
