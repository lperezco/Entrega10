class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.estado = 'pendiente';  
    }
}

let listaTareas = [];

function agregarTarea() {
    const input = document.getElementById('nueva-tarea');
    const nombreTarea = input.value.trim();
    if (nombreTarea === '') return;

    const nuevaTarea = new Tarea(nombreTarea);
    listaTareas.push(nuevaTarea);
    input.value = '';
    actualizarInterfaz();
}

function actualizarInterfaz() {
    const pendientesDiv = document.getElementById('pendientes');
    const haciendoDiv = document.getElementById('haciendo');
    const completadasDiv = document.getElementById('completadas');

    pendientesDiv.innerHTML = '';
    haciendoDiv.innerHTML = '';
    completadasDiv.innerHTML = '';

    listaTareas.forEach((tarea, index) => {
        const tareaDiv = document.createElement('div');
        tareaDiv.className = 'tarea';
        tareaDiv.innerHTML = `
            <span>${tarea.nombre}</span>
        `;

        if (tarea.estado === 'pendiente') {
            const moverBtn = document.createElement('button');
            moverBtn.textContent = '→';
            moverBtn.onclick = () => moverTarea(index, 'haciendo');
            tareaDiv.appendChild(moverBtn);
            pendientesDiv.appendChild(tareaDiv);
        } else if (tarea.estado === 'haciendo') {
            const completarBtn = document.createElement('button');
            completarBtn.textContent = '✔';
            completarBtn.className = 'completar';
            completarBtn.onclick = () => moverTarea(index, 'completada');

            const volverBtn = document.createElement('button');
            volverBtn.textContent = '←';
            volverBtn.className = 'volver';
            volverBtn.onclick = () => moverTarea(index, 'pendiente');

            tareaDiv.appendChild(volverBtn);
            tareaDiv.appendChild(completarBtn);
            haciendoDiv.appendChild(tareaDiv);
        } else if (tarea.estado === 'completada') {
            completadasDiv.appendChild(tareaDiv);
        }
    });
}

function moverTarea(index, nuevoEstado) {
    listaTareas[index].estado = nuevoEstado;
    actualizarInterfaz();
}