const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/questionaire');

mongoose.connection.on('error', err=>{console.log('Mongo connection error:' + err);});
mongoose.connection.once('open', ()=>{console.log('Mongo connection succeed');});

const userSchema = mongoose.Schema({
	account: String,
	password: String
});

const qsnrSchema = mongoose.Schema({
	account: String,
	qsnr: Object,
	state: String
})

const Models = {
	User: mongoose.model('user', userSchema),
	Qsnr: mongoose.model('qsnr', qsnrSchema)
}

module.exports = Models;