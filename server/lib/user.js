const crypto = require('crypto');
const User = require('./../Models/Base.js').User;
function GenerateKey() {
	return crypto.randomBytes(48).toString('hex');
}

function userByToken(key) {
	return new Promise((res, rej) => {
		User.find({ token: key }, (er, data) => {
			if (er) {
				rej(null);
			}
			if (data.length > 0) {
				let user = data[0];
				delete user.password;
				res(user);
			} else {
				rej(null);
			}
		});
	});
}
function getToken(req) {
	let key = null;
	if (req.headers && req.headers.authorization) {
		key = req.headers.authorization.split(' ')[1].trim();
	}
	return key;
}

module.exports = { GenerateKey, userByToken, getToken };
