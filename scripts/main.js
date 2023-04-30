let url = "https://pokeapi.co/api/v2/pokemon/"
const FORMULARIO = document.getElementById("formulario")
const card_container = document.getElementsByClassName("card-container")[0]
const input_name = document.getElementById("text-input")


function createNewObject(img_src,nombre, hp,attack, defense, specialAttack, specialDefense, speed){
    while (card_container.firstChild) {
        card_container.removeChild(card_container.firstChild);
    }
    card_container.insertAdjacentHTML("afterbegin",
        `
        <picture class="card__cover">
            <img src="${img_src}" alt="" class="card__cover-img">
        </picture>
        <article class="card__body">
            <h4 class="card__title">${nombre}</h4>
            <ul class="card__stats">
                <li class="stats__item">
                    <p class="stat__name">HP</p>
                    <p class="stat__desc">${hp}</p>
                </li>
                <li class="stats__item">
                    <p class="stat__name">ATTACK</p>
                    <p class="stat__desc">${attack}</p>
                </li>
                <li class="stats__item">
                    <p class="stat__name">DEFENSE</p>
                    <p class="stat__desc">${defense}</p>
                 </li>
                <li class="stats__item">
                    <p class="stat__name">SPECIAL ATTACK</p>
                    <p class="stat__desc">${specialAttack}</p>
                </li>
                <li class="stats__item">
                    <p class="stat__name">SPECIAL DEFFENSE</p>
                    <p class="stat__desc">${specialDefense}</p>
               </li>
               <li class="stats__item">
                    <p class="stat__name">SPEED</p>
                    <p class="stat__desc">${speed}</p>
                </li>
            </ul>
        </article>
        `
    )
}


FORMULARIO.addEventListener("submit", (e)=>{
    e.preventDefault();
    input_name.value = input_name.value.toLowerCase();
    let newForm  = new FormData(FORMULARIO)
    let newUrl = `${url}${newForm.get("nombre")}`
    fetch(newUrl)
    .then(Response => Response.json())
    .then((data)=>{
        let datos = data
        return datos
    })
    .then((datos)=>{
        createNewObject(datos.sprites.front_default, datos.name, 
            datos.stats[0].base_stat,
            datos.stats[1].base_stat,
            datos.stats[2].base_stat,
            datos.stats[3].base_stat,
            datos.stats[4].base_stat,
            datos.stats[5].base_stat,
            )
    })
    .catch(err => console.log(err))

})


//Carga del ditto por defecto
fetch(`${url}ditto`)
    .then(Response => Response.json())
    .then((data)=>{
        let datos = data
        return datos
    })
    .then((datos)=>{
        createNewObject(datos.sprites.front_default, datos.name, 
            datos.stats[0].base_stat,
            datos.stats[1].base_stat,
            datos.stats[2].base_stat,
            datos.stats[3].base_stat,
            datos.stats[4].base_stat,
            datos.stats[5].base_stat,
            )
    })
    .catch(err => console.log(err))


//Carga de las opciones del datalist
fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then(Response => Response.json())
    .then((data) => {
        let datos = new Array(data.count)
        data.results.forEach((el, index) => datos[index] = el.name)
        return datos;
    })
    .then((datos)=> {
        let obj = document.getElementById("options");
        datos.forEach(el => {obj.insertAdjacentHTML("beforeend",`<option value="${el}">`)})
    })
    .catch(err => console.log(err))
