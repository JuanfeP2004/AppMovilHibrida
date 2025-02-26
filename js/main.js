import Navegacion from './util/navegation.js';
import CrearTarea from './util/crearTarea.js';

let nav = new Navegacion();
let crearTarea = new CrearTarea();

document.addEventListener('DOMContentLoaded', () => {
    nav.paginaInicial();
});