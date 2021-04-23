const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
const Pokemon = require('../models/pokemon')


router.get('/', async (req, res) => {

  let user = req.session.user
  // const auction = await Auction.find({})
  return res.render('index')

  //return res.render('index',{username:user,auction})
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  let { username, email, password } = req.body
  let checkUser = await User.find({ email: email })
  if (checkUser.length > 0) {
    res.render('index', (err, html) => { res.send(html) })
    res.send('Ошибка, такая почта уже есть ')
    return
  }
  let user = await User.create({
    username, email, password: bcrypt.hashSync(password)
  })
  req.session.user = user
  res.render('index', { username: req.session.user })
})


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res) => {
  let { email, password } = req.body
  let checkUser = await User.findOne({ email: email })
  if (checkUser) {
    if (bcrypt.compareSync(password, checkUser.password)) {
      req.session.user = checkUser

      res.redirect('/')
    }
  }
  res.redirect('/login')
})

router.get('/logout', async (req, res) => {
  if (req.session.user) {

    await req.session.destroy();
    res.clearCookie("user_sid");
    res.redirect("/");



  } else {
    res.redirect("/login");
  }
})





router.get('/pokemon', async (req, res) => {

  const pokemon = await Pokemon.find({})


  res.render('pokemons', { layout: false, pokemon })
})


router.post('/addpokemon', async (req, res) => {

  let { pokemonHeight,
    pokemonWeight,
    pokemonImage, pokemonName, pokemonPairImage } = req.body
  console.log(pokemonPairImage);
  await Pokemon.create({
    weight: pokemonWeight,
    height: pokemonWeight,
    image: pokemonImage,
    name: pokemonName,
    pairImage: pokemonPairImage
  })
  res.json({
    pokemonHeight,
    pokemonWeight,
    pokemonImage,
    pokemonName,
    pokemonPairImage
  });

})

module.exports = router



