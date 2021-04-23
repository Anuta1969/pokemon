const { Schema, model } = require('mongoose')


const userScheme = new Schema({
  username: String,
  email: { type: String },
  password: { type: String }
})


module.exports = model('users', userScheme)
