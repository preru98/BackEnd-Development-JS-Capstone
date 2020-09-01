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

router.post('/login', (req, res, next) => {

	if(!req.session.user){
		let authHeader = req.headers.authorization;

		if(!authHeader){
			res.setHeader('WWW-Authenticate', 'Basic');
			let err = new Error('You are not authenticated');
			err.status = 401;
			next(err); 
		}
		let auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
		let username = auth[0];
		let password = auth[1];

		Users.findOne({username : username})
		.then( (user)=>{
			if(!user){
			err = new Error('User does not exists');
			err.status = 403;
			next(err); 
			}
			else if(password !== user.password){
				err = new Error('Password does not match');
				err.status = 403;
				next(err); 
			}
			else{
				req.session.user = 'authenticated';
				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/plain');
				res.end('You are authenticated!')
			}
		}, (err) => {
			next(err);
		})
		.catch((err) => {
			next(err);
		})
	}
	else{
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('You are already authenticated!');
	}
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
