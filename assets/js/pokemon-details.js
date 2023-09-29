const content = document.getElementById('content')
const dataPoke = document.getElementById('pokemon')
const aboutPoke = document.getElementById('about')

function getId() {
    const getUrl = window.location.href
    const paramUrl = new URL(getUrl)
    const id = paramUrl.searchParams.get("id")
    return id
}



function pagePokemon(id) {
    PokeApi.getPokemonDetailById(id).then((detail) => {
        content.classList.add(`${detail.type}`)
        dataPoke.innerHTML += `
        <header>
        <div class='icon'>
        <a href="index.html"><img src="assets/imgs/icon-back.png" alt="icon-back"></a>
        </div>
        <section class="pokemon">
        <span class="number">#${detail.number}</span>
        <h1 class="name">${detail.name}</h1>
        <ol class="types">
        ${detail.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        </section>
        <div class="img-pokemon">
            <a href="index.html">
                <img src="${detail.photo}" alt="${detail.name}">
            </a>
        </div>
        </header>
        
        `
        aboutPoke.innerHTML += `
       
        <main>
            <section class="detail"> 
            <ul class="menu">
            <li data-alvo="aba1">About</li>
            <li data-alvo="aba2">Base Stats</li>
            </ul>
            <div id="aba1" class="conteudo mostrando">
            <h2 class="subtitle">Sobre</h2>
            <dl class="about">
            <dt class="text">height</dt>
            <dd class="text">${detail.height / 10} m</dd>
            <dt class="text">weight</dt>
            <dd class="text">${detail.weight / 10} Kg</dd>
            <dt class="text">Skills</dt>
            <ol class="abilities">
            ${detail.abilities.map((ability) => `<li class="skill ${ability}">${ability}</li>`).join(',')}
            </ol>
            </dl>
            </div>
            <div id="aba2" class="conteudo">
            <h2 class="subtitle">Status</h2>
            <dl class="skills">
            <dt class="ability">HP - (${detail.hp})</dt>
            <dd class="bar">
                <progress class="progress-bar" max="200" value="${detail.hp}">${detail.hp}</progress>
            </dd>
    
            <dt class="ability">Attack - (${detail.attack})</dt>
            <dd class="bar">
                <progress class="progress-bar" max="200" value="${detail.attack}">${detail.attack}</progress>
            </dd>
    
            <dt class="ability">Defense - (${detail.defense})</dt>
            <dd class="bar">
                <progress class="progress-bar" max="200" value="${detail.defense}">${detail.defense}</progress>
            </dd>
            
            <dt class="ability">Sp. Atk - (${detail.spAtk})</dt>
            <dd class="bar">
                <progress class="progress-bar" max="200" value="${detail.spAtk}">${detail.spAtk}</progress>
            </dd>
            
            <dt class="ability">Sp. Def - (${detail.spDef})</dt>
            <dd class="bar">
                <progress class="progress-bar" max="200" value="${detail.spDef}">${detail.spDef}</progress>
            </dd>
            
            <dt class="ability">Speed (${detail.speed})</dt>
            <dd class="bar">
                <progress class="progress-bar" max="200" value="${detail.speed}">${detail.speed}</progress>
            </dd>
    
            <dt class="ability">Total (${detail.total})</dt>
            <dd class="bar">
                <progress class="progress-bar" max="700" value="${detail.total}">${detail.total}</progress>
            </dd>
            </dl>
            </div>
            </section>
    </main>          
 `
    })
}
pagePokemon(getId())

const menuItems = document.querySelectorAll('ul.menu li');
    const barraDinamica = document.querySelector('.barra-dinamica');
    const conteudoAba = document.querySelectorAll('.conteudo');

    if (menuItems != null) {
        menuItems.forEach(item => {

            item.addEventListener('click', () => {
                const alvo = item.getAttribute('data-alvo');

                // Oculta todos os conteúdos das abas
                conteudoAba.forEach(aba => {
                    aba.classList.remove('mostrando');
                });

                // Mostra o conteúdo da aba selecionada
                document.getElementById(alvo).classList.add('mostrando');

                // Move a barra dinâmica para a aba selecionada
                const largura = item.offsetWidth;
                const esquerda = item.offsetLeft;
                barraDinamica.style.width = `${largura}px`;
                barraDinamica.style.transform = `translateX(${esquerda}px)`;
            });
        });
    } else {
        console.log("Sua lista de items é nula")
    }