import Navegacion from './util/navegation.js';
import Auth from "./util/auth.js";
import "./util/pomodoroModal.js";
import "./util/pomodoroStreak.js";
import "./util/verHoyDate.js";
import "./util/verHoy.js";
import CrearTarea from './util/crearTarea.js';
import Calendario from './util/calendario.js';
import Tarea from './data/tarea.js';
import User from './data/user.js';




let nav = new Navegacion();
let auth = new Auth(nav); // 🔹 Agregamos autenticación a la navegación


document.addEventListener('DOMContentLoaded', () => {
    auth.verificarSesion(); // 🔹 Verifica si el usuario está autenticado antes de mostrar la página
    nav.paginaInicial();
    calendario.ponerMes(new Date().getMonth()); 
    calendario.ponerTareas(user.name, new Date().getMonth(), new Date().getFullYear());
});

// 🔹 Escuchar cambios de autenticación
document.addEventListener("paginaCambiada", () => auth.configurarEventos());
