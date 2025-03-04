import Navegacion from './util/navegation.js';
import "./util/pomodoroModal.js";
import "./util/pomodoroStreak.js";
import "./util/verHoyDate.js";

let nav = new Navegacion();

document.addEventListener('DOMContentLoaded', () => {
    nav.paginaInicial();
});