var express = require('express');
var router = express.Router();
var api = require('../api')

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.user){
		var data = {
			title: 'ПРИВЕТ',
			user : req.session.user.username
		}
		res.render('index', data);
	} else {
		var data = {
		  	title: 'MExpress'
			
		}
		res.render('index', data);
	}
});





module.exports = router;
