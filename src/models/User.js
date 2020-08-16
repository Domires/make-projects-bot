const mongoose = require('mongoose')

const model = mongoose.model
const Schema = mongoose.Schema

const UserSchema = new Schema({
    _id: Number,
    name: { type: String, require: true },
    username: { type: String, require: true },
    stack: String,
    github: String,
    techs: [String],
    date: { type: Date, default: Date.now }
})

module.exports = model('User', UserSchema)