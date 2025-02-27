import Navegacion from './util/navegation.js';
import CrearTarea from './util/crearTarea.js';
import Calendario from './util/calendario.js';

let nav = new Navegacion();
let crearTarea = new CrearTarea();
let calendario = new Calendario();

document.addEventListener('DOMContentLoaded', () => {
    nav.paginaInicial();
    calendario.ponerMes(new Date().getMonth()); 
});