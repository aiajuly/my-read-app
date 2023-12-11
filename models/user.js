const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
// this line below will add: username, passsword, etc.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);