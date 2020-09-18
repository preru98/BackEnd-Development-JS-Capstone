var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Users = require('../models/users');
const passport = require('passport');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
	Users.register(new Users({username : req.body.username}), req.body.password, (err, user) => {
		if(err){
			res.statusCode=500;
			res.setHeader('Content-Type', 'application/json');
			res.json({ err:err });
		}
		else{
			passport.authenticate('local')(req, res, () => {
				res.statusCode=500;
				res.setHeader('Content-Type', 'application/json');
				res.json({ status : 'Registration Successful', success: true });
			});
		}
	});
});

router.post('/login',passport.authenticate('local'), (req, res, next) => {
	res.statusCode=200;
	res.setHeader('Content-Type', 'application/json');
	res.json({ status : 'You are successfully Logged In', success: true });
})

router.get('/logout', (req, res, next) => {
	if(req.session){
		req.session.destroy();
		res.clearCookie('session-id');
		res.redirect('/');
	}
	else{
		var err = new Error('You are not logged in!');
		err.status = 403;
		next(err);
	}
})


module.exports = router;
