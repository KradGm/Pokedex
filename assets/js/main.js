
const offset = 0
const limit = 10
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <span class="number">#001</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail"> 
                <ol class="types">
                    <li class="type">Grass</li>
                    <li class="type">Poison</li>
                </ol> 

                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
            /div>
        </li>
`
}
const pokemonOl = document.getElementById('pokemonList')

//Fetch retorna uma promessa de resposta e o then diz que quando isso der certo, chame a função para que eu possa manipular a resposta
fetch(url)
    .then((response) => response.json()) //Transformar response em promessa do body convertido em json  
    .then((jsonBody) => jsonBody.results)
    .then((pokemonList) => {
       
        for (let i = 0; i<pokemonList.length; i++) {
            const pokemon = pokemonList[i]
            pokemonList.innerHTML += convertPokemonToLi(pokemon)
        }
   }) 
    .catch((error) => console.log(error))
