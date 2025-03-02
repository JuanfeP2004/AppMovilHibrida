import Navegacion from './util/navegation.js';
import CrearTarea from './util/crearTarea.js';
import Calendario from './util/calendario.js';
import Tarea from './data/tarea.js';
import User from './data/user.js';

let actividades = [
    new Tarea("Matemáticas - Álgebra", "Tarea", new Date("2025-03-01T14:30:00"), 85.5),
    new Tarea("Historia - Revolución Francesa", "Estudio", new Date("2025-03-01T10:15:00"), 92.0),
    new Tarea("Física - Movimiento Rectilíneo", "Examen", new Date("2025-03-01T08:00:00"), 78.3),
    new Tarea("Química - Elementos químicos", "Tarea", new Date("2025-03-03T16:45:00"), 88.7),
    new Tarea("Biología - Células", "Estudio", new Date("2025-03-04T12:30:00"), 94.2),
    new Tarea("Matemáticas - Integrales", "Examen", new Date("2025-04-01T09:20:00"), 80.0),
    new Tarea("Historia - Segunda Guerra Mundial", "Estudio", new Date("2025-04-01T14:00:00"), 89.5),
    new Tarea("Física - Leyes de Newton", "Tarea", new Date("2025-04-02T18:10:00"), 76.8),
    new Tarea("Química - Reacciones químicas", "Examen", new Date("2025-04-09T07:45:00"), 90.1),
    new Tarea("Biología - Genética", "Tarea", new Date("2025-05-10T20:30:00"), 85.0),
    new Tarea("Matemáticas - Probabilidades", "Estudio", new Date("2025-05-10T11:10:00"), 97.3),
    new Tarea("Historia - Guerra Fría", "Examen", new Date("2025-05-12T15:50:00"), 83.2),
    new Tarea("Física - Energía y trabajo", "Tarea", new Date("2025-05-13T09:40:00"), 79.5),
    new Tarea("Química - Ácidos y bases", "Estudio", new Date("2025-05-14T13:25:00"), 91.8),
    new Tarea("Biología - Ecosistemas", "Examen", new Date("2025-03-15T17:15:00"), 88.0),
    new Tarea("Matemáticas - Ecuaciones diferenciales", "Tarea", new Date("2025-06-06T08:55:00"), 82.7),
    new Tarea("Historia - Independencia de América", "Estudio", new Date("2025-06-07T14:45:00"), 95.5),
    new Tarea("Física - Óptica", "Examen", new Date("2025-06-11T19:30:00"), 87.6),
    new Tarea("Química - Termodinámica", "Tarea", new Date("2025-06-12T10:20:00"), 80.9),
    new Tarea("Biología - Evolución", "Estudio", new Date("2025-06-12T16:05:00"), 93.4)
];

let user = new User("Juan", "12345678", 0, actividades);

localStorage.setItem('Juan', JSON.stringify(user));

let nav = new Navegacion();
let crearTarea = new CrearTarea('Juan');
let calendario = new Calendario(nav, 'Juan');

document.addEventListener('DOMContentLoaded', () => {
    nav.paginaInicial();
    calendario.ponerMes(new Date().getMonth()); 
    calendario.ponerTareas(user.name, new Date().getMonth(), new Date().getFullYear());
});

setInterval(() => calendario.ponerTareas(user.name, new Date().getMonth(), new Date().getFullYear()), 60000);