const pokemonOl = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMoreButton')
const form = document.querySelector('.form')
const input = document.querySelector('.inputbar')





const limit = 10
let offset = 0

const maxRecords = 151

function loadPokemonItens(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail"> 
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol> 
    
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
    `).join('')//Convertida lista de pokemons em uma lista de Li, juntando todos os li
        
        pokemonOl.innerHTML += newHtml
    })
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset +=limit
    const nextRecordValue = offset+limit
    if(nextRecordValue >= maxRecords){
        const newLimit = maxRecords - offset

        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{

        loadPokemonItens(offset, limit)

    }
})


