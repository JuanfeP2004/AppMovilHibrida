import Auth from "./auth.js";

class Navegacion {
    paginas = [];

    constructor() {
        this.auth = new Auth(); // Instancia de Auth
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
        this.paginas.find(pagina => {
            if (pagina.nombre === 'inicioSesion') {
                pagina.ref.style.display = 'block';
            } else {
                pagina.ref.style.display = 'none';
            }
        });
    }

    cambiarPagina(evento) {
        let parametro = evento.target.getAttribute('data-page');
        evento.preventDefault();
    
        this.paginas.forEach(pagina => {
            pagina.ref.style.display = (pagina.nombre === parametro) ? 'block' : 'none';
        });
    
        // 🔥 Notificamos que la página cambió para que `main.js` pueda asignar eventos
        document.dispatchEvent(new Event("paginaCambiada"));
    }
}

export default Navegacion;
