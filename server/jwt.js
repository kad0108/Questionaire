const secret = 'kad';
var jwt = require('jsonwebtoken');
// var token = jwt.sign({foo: 'bar'}, secret);

// console.log(token);
// jwt.verify(token, secret, function(err, decoded){
// 	if(err) console.log(err);
// 	else console.log(decoded);
// })
// console.log(jwt.decode(token));

module.exports = {
	sign: function(data){
		return jwt.sign(data, secret);
	},
	verify: function(token, callback){
		jwt.verify(token, secret, function(err, decoded){
			callback(err, decoded);
		})
	}
}
