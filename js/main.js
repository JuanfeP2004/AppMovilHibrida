import Navegacion from './util/navegation.js';
import { iniciarSesion, cerrarSesion } from './auth.js';

let nav = new Navegacion();

document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = localStorage.getItem("usuarioActual");
    if (usuarioActual) {
        nav.cambiarPagina({ target: { getAttribute: () => "verHoy" }, preventDefault: () => {} });
    } else {
        nav.paginaInicial();
    }

    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;
            
            const usuario = iniciarSesion(email, password);
            if (usuario) {
                alert("Inicio de sesión exitoso");
                nav.cambiarPagina({ target: { getAttribute: () => "verHoy" }, preventDefault: () => {} });
            } else {
                alert("Correo o contraseña incorrectos");
            }
        });
    }

    const logoutButton = document.querySelector("#logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            cerrarSesion();
            alert("Sesión cerrada");
            nav.cambiarPagina({ target: { getAttribute: () => "inicioSesion" }, preventDefault: () => {} });
        });
    }
});