//se crea una varible de tipo funcion para que nos retorne
//un numero al azar de 1 a 150 con la propiedad getRandomInt
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


//se crea la variable random cuando la pagina se renderiza por completo

document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1,151)
    fetchData(random)
});

//Promesa que nos recibe los datos y convierte en JSON
const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat

        }

        pintarCard(pokemon)
    } catch (error) {
        console.log(error)
    }
}

//Pintar la card que se establecio dentro de la etiqueta template en index
const pintarCard = (pokemon) => {
    console.log(pokemon)
    
    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span style="color: black;">${pokemon.hp}</span>`
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Experiencia'
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + ' mil'
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + ' mil'
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + ' mil'

    fragment.appendChild(clone)
    flex.appendChild(fragment)




}
