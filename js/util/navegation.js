import { mostrarTareasHoy } from './verHoy.js';
import Auth from "./auth.js";

class Navegacion {
    paginas = [];

    constructor() {
        this.auth = new Auth(this); // 🔹 Referencia a auth para verificar login
        this.paginas.push({ nombre: "inicioSesion", ref: document.querySelector('.inicioSesion') });
        this.paginas.push({ nombre: "registro", ref: document.querySelector('.registro') });
        this.paginas.push({ nombre: "verHoy", ref: document.querySelector('.verHoy'), privada: true });
        this.paginas.push({ nombre: "calendario", ref: document.querySelector('.calendario'), privada: true });
        this.paginas.push({ nombre: "pomodoro", ref: document.querySelector('.pomodoro'), privada: true });
        this.paginas.push({ nombre: "crearTarea", ref: document.querySelector('.crearTarea'), privada: true });

        document.querySelectorAll('.navButton').forEach(item => {
            item.addEventListener('click', this.cambiarPagina.bind(this));
        });
    }

    paginaInicial() {
        let paginaInicial = this.auth.usuarioActual ? "verHoy" : "inicioSesion";
        this.cambiarPaginaString(paginaInicial);
    }

    cambiarPagina(evento) {
        let parametro = evento.target.getAttribute('data-page');
        evento.preventDefault();
        this.cambiarPaginaString(parametro);
    }

    cambiarPaginaString(parametro) {
        let paginaEncontrada = this.paginas.find(p => p.nombre === parametro);

        if (!paginaEncontrada) {
            console.error(`❌ La página "${parametro}" no existe.`);
            return;
        }

        if (paginaEncontrada.privada && !this.auth.usuarioActual) {
            alert("⚠️ Debes iniciar sesión para acceder a esta página.");
            this.cambiarPaginaString("inicioSesion");
            return;
        }

        this.paginas.forEach(pagina => {
            pagina.ref.style.display = pagina.nombre === parametro ? "block" : "none";
            if (parametro === "verHoy") {
                mostrarTareasHoy();
            }
        });

        document.dispatchEvent(new Event("paginaCambiada"));
    }
}

export default Navegacion;
