import Navegacion from "./util/navegation.js";
import Auth from "./util/auth.js";

const navegacion = new Navegacion();
const auth = new Auth(navegacion); // 🔄 Pasamos `navegacion` a `Auth`

window.auth = auth; // Para pruebas en consola

document.addEventListener("DOMContentLoaded", () => {
    navegacion.paginaInicial();
    configurarEventos();
});

document.addEventListener("paginaCambiada", configurarEventos);

function configurarEventos() {
    auth.configurarEventos();
}
