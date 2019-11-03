const session = require('express-session');
const User = require('./../Models/Base.js').User;
const bcrypt = require('bcrypt');
const userLib = require('../lib/user.js');

class AuthController {
	constructor(db) {
		this.db = db;
	}
	currentUser(req, res) {
		var user = {
			id: req.session.user_id,
			user: req.session.user
		};
		return res.send(user);
	}
	async profile(req, res) {
		let key = userLib.getToken(req);
		try {
			let user = await userLib.userByToken(key);
			return res.send(user);
		} catch (e) {
			return res.send(e);
		}
	}
	login(req, res) {
		User.findOne(
			{
				mail: req.body.mail
			},
			function(er, data) {
				if (er) {
					return res.send(er);
				}
				bcrypt.compare(req.body.password, data.password, function(
					error,
					resb
				) {
					if (error) {
						return res.send(error);
					}
					if (resb === true) {
						req.session.user_id = data['_id'];
						req.session.user = {
							mail: data['mail'],
							name: data['name']
						};

						if (data.token) {
						} else {
							let token = userLib.GenerateKey();
							let user = User.updateOne(
								{ mail: req.body.mail },
								{ $set: { token: token } },
								(er, dt) => {
									if (er) {
										return res.send('Error');
									}
								}
							);
							data.token = token;
						}
						return res.send(data);
					} else {
						console.log('Пользователь не прошол проверку');
						return res.send('ERROR PASS');
					}
				});
			}
		);
	}
	logout(req, res) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
		res.header('Pragma', 'no-cache');
		res.header('Expires', 0);
		req.session.user_id = undefined;
		req.session.user = undefined;
		return res.status(200).send({ 1: 2 });
	}
}
module.exports = AuthController;
