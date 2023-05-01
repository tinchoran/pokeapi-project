const baseUrl = "https://pokeapi.co/api/v2/ability/?limit=20&offset=20";
let pagina = 1;
const buttons = document.querySelectorAll(".btn")
const grilla = document.querySelector(".grilla");

const createElement = (direcc)=>{
    return fetch(direcc)
    .then(response => response.json())
    .then(data => {
        grilla.insertAdjacentHTML("beforeend", `
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

const pedirDatos = async (pag)=>{
    let urlDir = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pag * 20}`
    let res = await fetch(urlDir).then(response => response.json()).then(data => {let datos = [];data.results.forEach(el => datos.push(el.url));return datos}).catch(error => console.log(error))
    let crear;
    for(let el of res){
        crear = await createElement(el)
    }
}



buttons.forEach(el => {
    el.addEventListener("click", (e)=>{
        if(e.target.id === "btnSiguiente" && pagina < 51){
            grilla.innerHTML = "";
            pagina += 1;
            pedirDatos(pagina)
            return pagina
        }else if(e.target.id === "btnAnterior" && pagina>1){
            grilla.innerHTML = "";
            pagina -= 1
            pedirDatos(pagina)
            return pagina
        }
    })
})

//Hacer el pedido inicial de los 20 primeros elementos
pedirDatos(0)