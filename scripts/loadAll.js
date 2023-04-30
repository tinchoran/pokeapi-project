const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=10000";
let direcciones = new Array()


const createElement = (direcc)=>{
    return fetch(direcc)
    .then(response => response.json())
    .then(data => {
        document.querySelector(".grilla").insertAdjacentHTML("beforeend", `
        <article class="cardAll">
                <picture class="cardAll__cover">
                    <img src="${data.sprites.front_default}" alt="" class="cardAll__img" loading="lazy">
                </picture>
                <h4 class="cardAll__title">${data.name}</h4>
                <div class="cardAll__stats">
                    <p class="cardAll__stat">${data.stats[0].stat.name}</p>
                    <p class="cardAll__stat">${data.stats[0].base_stat}</p>
                    <p class="cardAll__stat">${data.stats[1].stat.name}</p>
                    <p class="cardAll__stat">${data.stats[1].base_stat}</p>
                    <p class="cardAll__stat">${data.stats[2].stat.name}</p>
                    <p class="cardAll__stat">${data.stats[2].base_stat}</p>
                    <p class="cardAll__stat">${data.stats[3].stat.name}</p>
                    <p class="cardAll__stat">${data.stats[3].base_stat}</p>
                    <p class="cardAll__stat">${data.stats[4].stat.name}</p>
                    <p class="cardAll__stat">${data.stats[4].base_stat}</p>
                    <p class="cardAll__stat">${data.stats[5].stat.name}</p>
                    <p class="cardAll__stat">${data.stats[5].base_stat}</p>
                </div>
            </article>`
        )
    })
    .catch(err => console.error(err))

}

const pedidoInicial = async ()=>{
    let res = await fetch(baseUrl).then(response => response.json()).then(data => {let datos = [];data.results.forEach(el => datos.push(el.url));return datos}).catch(error => console.log(error))
    let crear;
    for(let el of res){
        crear = await createElement(el)
    }
}
pedidoInicial()