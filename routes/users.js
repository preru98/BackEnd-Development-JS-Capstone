var express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const Users = require('../models/users');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
	Users.findOne({username : req.body.username})
	.then( (user) => {
		if(user){
			let err =new Error('User with username ' + req.body.username + ' already exists!');
			err.status = 403;
			next(err);
		}
		else{
			Users.create({
				username : req.body.username,
				password : req.body.password
			})
			.then( (user) => {
				res.statusCode=200;
				res.setHeader('Content-Type', 'application/json');
				let response ={
					status : 'Registration Successful',
					user : user
				};
				res.json(response);
			}, (err) => {
				next(err);
			})
		}
	}, (err) => {
		next(err);
	})
	.catch((err) => {
		next(err);
	})
})


module.exports = router;
