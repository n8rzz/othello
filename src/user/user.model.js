const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: { type: String, unique: true, required: true },
    name: String,
    email: { type: String, unique: true, required: true },
    accessProvider: { type: String, required: true },
    token: { type: String, unique: true, required: true },
    lastSeen: Date,
    firstSeen: Date
});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;
