
let amigos = [];
let asignaciones = {}; // Objeto para almacenar las asignaciones

// Función para agregar un nombre a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre === '') {
        alert('Ingrese un nombre válido.');
        return;
    }

    if (amigos.includes(nombre)) {
        alert('Este nombre ya ha sido agregado.');
        return;
    }

    amigos.push(nombre);
    input.value = ''; // Limpiar el campo de entrada
    actualizarListaAmigos();
}

// Función para actualizar la lista de amigos en pantalla
function actualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; // Limpiar contenido previo

    amigos.forEach((amigo, index) => {
        const item = document.createElement('li');
        item.textContent = `${index + 1}. ${amigo}`;
        lista.appendChild(item);
    });
}
function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Debe haber al menos dos participantes.');
        return;
    }

    // Borrar el resultado anterior INMEDIATAMENTE al hacer clic en "Sortear"
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    let nombreSeleccionado = prompt('Por favor selecciona tu nombre de la lista:\n' + amigos.join('\n'));

    if (!nombreSeleccionado || !amigos.includes(nombreSeleccionado)) { 
        alert('Nombre no encontrado.');
        return;
    }

    if (asignaciones[nombreSeleccionado]) {
        alert('Ya has seleccionado tu amigo secreto.');
        return;
    }

    // Filtrar solo los amigos que no han sido asignados aún
    let posiblesAmigos = amigos.filter(a => a !== nombreSeleccionado && !Object.values(asignaciones).includes(a));

    if (posiblesAmigos.length === 0) {
        alert('No hay más amigos secretos disponibles.');
        return;
    }

    // Seleccionar un amigo secreto aleatorio
    let randomIndex = Math.floor(Math.random() * posiblesAmigos.length);
    let amigoSecreto = posiblesAmigos[randomIndex];

    // Asignar el amigo secreto y actualizar la lista de seleccionados
    asignaciones[nombreSeleccionado] = amigoSecreto;

    mostrarResultado(nombreSeleccionado, amigoSecreto);
    actualizarListaAmigos();
}


// Función para mostrar el resultado del sorteo
function mostrarResultado(nombre, amigoSecreto) {
    const resultado = document.getElementById('resultado');
    
    resultado.innerHTML = ''; // Limpia el resultado anterior antes de mostrar el nuevo

   /* const item = document.createElement('li');
    item.textContent = `${nombre}, tu amigo secreto es: ${amigoSecreto}!`;
    resultado.appendChild(item);*/

const item = document.createElement('li');
item.textContent = `${nombre}, tu amigo secreto es: ${amigoSecreto}!`;
resultado.appendChild(item);

// Agrega un evento de clic al elemento recién creado
item.addEventListener('click', () => {
  // Oculta el elemento al hacer clic en él
  item.style.display = 'none';
});

}