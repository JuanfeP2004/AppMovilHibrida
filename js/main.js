import Navegacion from "./util/navegation.js";
import Auth from "./util/auth.js";

const auth = new Auth();
const navegacion = new Navegacion();
window.auth = auth; // Para pruebas en consola

document.addEventListener("DOMContentLoaded", () => {
    navegacion.paginaInicial();
    configurarEventos();
});

document.addEventListener("paginaCambiada", configurarEventos);

function configurarEventos() {
    auth.configurarEventos(); // Delegamos la configuración de eventos a `auth.js`
}
