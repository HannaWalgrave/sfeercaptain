var mongoose = require('mongoose');
var expressvalidator = require('express-validator');
var bcrypt   = require('bcrypt-nodejs');

var userDataSchema = new mongoose.Schema({
    naam: {type:String, required: true},
    email: {type:String, required: true},
    age: {type:String, required: true}
},{collection: 'userData'});


// generating a hash
userDataSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userDataSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userDataSchema);