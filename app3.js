//  verificar si el DOM esta cargado
document.addEventListener('DOMContentLoaded', () => {
    let listaPokemon = document.querySelector("#lista_pokemon");
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
        .then(respuesta => respuesta.json()) // Convertimos la respuesta a JSON
        .then(datos => {
            console.log(datos);
            // Iteramos sobre los resultados obtenidos
            datos.results.forEach(pokemon => {
                // Hacemos una solicitud para obtener detalles de cada Pokémon
                fetch(pokemon.url)
                    .then(res => res.json())
                    .then(info => {
                        // Creamos un nuevo elemento <li> para cada Pokémon
                        const item = document.createElement('div');
          
                        // Agregar un borde a cada elemnto item
                        item.style.border = '1px solid black';
                        item.style.padding = '10px';
                        item.style.margin = '10px';
                        item.style.borderRadius = '5px';


                        // Creamos y configuramos el elemento <h2> para el nombre
                        const nombre = document.createElement('h2');
                        nombre.textContent = info.name;

                        // Creamos y configuramos el elemento <img> para la imagen
                        const imagen = document.createElement('img');
                        imagen.src = info.sprites.front_default;
                        imagen.alt = info.name;
                        imagen.style.height = '200px';
                        imagen.style.width = '200px';


                        // Creamos y configuramos el elemento <p> para el tipo
                        const tipo = document.createElement('p');
                        tipo.innerHTML = `<strong>Tipo:</strong> ${info.types.map(type => type.type.name).join(", ")}`;

                        // Añadimos los elementos creados al <li>
                        item.appendChild(nombre);
                        item.appendChild(imagen);
                        item.appendChild(tipo);

                        // Añadimos el <li> a la lista
                        listaPokemon.appendChild(item);
                    });
            });
        })
        .catch(error => console.error('Error al cargar los Pokémon:', error));
});