import Tarea from '../data/tarea.js';
import User from '../data/user.js';

class verHoy {

    formatearHora(fecha) {
        let horas = fecha.getHours().toString().padStart(2, '0');
        let minutos = fecha.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    mostrarTareasHoy() {
        const tasksContainer = document.getElementById('tasksContainer');
        tasksContainer.innerHTML = '';

        let user = this.usuario_actual.getData()

        if (!user || !user.tareas) return;
    
        let tareas = user.tareas.map(obj => new Tarea(obj.titulo, obj.tipo, new Date(obj.fecha), obj.valor));
        let hoy = new Date();
        let tareasHoy = tareas.filter(tarea =>
            tarea.fecha.getDate() === hoy.getDate() &&
            tarea.fecha.getMonth() === hoy.getMonth() &&
            tarea.fecha.getFullYear() === hoy.getFullYear()
        );
    
        if (tareasHoy.length === 0) {
            tasksContainer.innerHTML = '<p>No tienes tareas para hoy 🎉</p>';
            return;
        }
    
        tareasHoy.sort((a, b) => a.fecha - b.fecha);
    
        tareasHoy.forEach(tarea => {
            const tareaElemento = document.createElement('div');
            tareaElemento.classList.add('task-card');
    
            tareaElemento.innerHTML = `
                <div class="task-info">
                    <p class="task-title">${tarea.tipo}</p>
                    <p class="task-subtitle">${tarea.titulo}</p>
                </div>
                <div class="task-meta">
                    <p class="task-time">${this.formatearHora(tarea.fecha)}</p>
                    <p class="task-value">${tarea.valor}%</p>
                </div>
            `;
            tasksContainer.appendChild(tareaElemento);
        });
    }
    
    // Función para formatear la hora correctamente


    constructor(usuario_actual){
        this.usuario_actual = usuario_actual;
    }
}

export default verHoy;

/*document.addEventListener('DOMContentLoaded', () => {
    //mostrarTareasHoy(usuario_actual);
});

export function mostrarTareasHoy(usuario_actual) {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';

    //let userLS = JSON.parse(localStorage.getItem('Juan'));
    if (!usuario_actual || !usuario_actual.tareas) return;

    let tareas = usuario_actual.tareas.map(obj => new Tarea(obj.titulo, obj.tipo, new Date(obj.fecha), obj.valor));
    let hoy = new Date();
    let tareasHoy = tareas.filter(tarea =>
        tarea.fecha.getDate() === hoy.getDate() &&
        tarea.fecha.getMonth() === hoy.getMonth() &&
        tarea.fecha.getFullYear() === hoy.getFullYear()
    );

    if (tareasHoy.length === 0) {
        tasksContainer.innerHTML = '<p>No tienes tareas para hoy 🎉</p>';
        return;
    }

    tareasHoy.sort((a, b) => a.fecha - b.fecha);

    tareasHoy.forEach(tarea => {
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('task-card');

        tareaElemento.innerHTML = `
            <div class="task-info">
                <p class="task-title">${tarea.tipo}</p>
                <p class="task-subtitle">${tarea.titulo}</p>
            </div>
            <div class="task-meta">
                <p class="task-time">${formatearHora(tarea.fecha)}</p>
                <p class="task-value">${tarea.valor}%</p>
            </div>
        `;
        tasksContainer.appendChild(tareaElemento);
    });
}

// Función para formatear la hora correctamente
function formatearHora(fecha) {
    let horas = fecha.getHours().toString().padStart(2, '0');
    let minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
}*/
