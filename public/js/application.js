let pokemonName = ''
let pokemonHeight = ''
let pokemonWeight = ''
let pokemonImage = ''
let pokemonPairImage = ''

const pokemonForm = document.querySelector('.pokemonForm')


pokemonForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  // console.dir(event.target)
  console.log(event.target.type.value)
  const {
    action,
    method,
    type: { value: type },
  } = event.target;
  //console.log(action, method, breed)

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${type}`)

  const result = await response.json()
  pokemonName = result.name
  console.log(pokemonName)
  pokemonHeight = result.height
  pokemonWeight = result.weight
  pokemonImage = result.sprites.front_default
  pokemonPairImage = result.sprites.front_female

  console.log(pokemonPairImage)
  console.log(pokemonImage)
  document.querySelector('.height').innerHTML = pokemonHeight
  document.querySelector('.weight').innerHTML = pokemonWeight
  document.querySelector('.name').innerHTML = pokemonName


  document.querySelector('#pokemonImage').innerHTML = `<img src="${pokemonImage}">`

  if (pokemonPairImage == null)
    document.querySelector('#pokemonPairImage').innerHTML = "в активном поиске💘"
  else

    document.querySelector('#pokemonPairImage').innerHTML = `<img src="${pokemonPairImage}">`



});


const add = document.querySelector('#add')


add.addEventListener("click", async (event) => {
  event.preventDefault();


  const response = await fetch('addpokemon', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pokemonName,
      pokemonHeight,
      pokemonWeight,
      pokemonImage,
      pokemonPairImage,

    }),
  });
  const jsonResponse = await response.json();


})


const all = document.querySelector('.all')


all.addEventListener("submit", async (event) => {
  event.preventDefault();
  const response = await fetch('pokemon', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },

  });
  const res = await response.text();

  //window.location('/index')

  const container = document.querySelector('.pokeContainer')
  container.innerHTML = res
})
