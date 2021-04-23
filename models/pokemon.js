
const { Schema, model } = require('mongoose')


const goodScheme = new Schema({
  name: String,
  weight: Number,
  height: Number,
  image: String,
  pairImage: String

})


module.exports = model('pokemons', goodScheme)
