
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

    cambiarPagina(parametro) {
        let paginaDestino = typeof parametro === "string" ? parametro : parametro.target.getAttribute("data-page");
    
        if (!paginaDestino) {
            console.error("❌ No se pudo determinar la página de destino.");
            return;
        }
    
        const paginaEncontrada = this.paginas.find(p => p.nombre === paginaDestino);
    
        if (!paginaEncontrada) {
            console.error(`❌ La página "${paginaDestino}" no existe en la navegación.`);
            return;
        }
    
        // Verificar si es una página privada y si el usuario está autenticado
        if (paginaEncontrada.privada && !this.auth.usuarioActual) {
            alert("⚠️ Debes iniciar sesión para acceder a esta página.");
            this.paginas.find(p => p.nombre === "inicioSesion").ref.style.display = "block";
            return;
        }
    
        this.paginas.forEach(pagina => {
            pagina.ref.style.display = pagina.nombre === paginaDestino ? "block" : "none";
        });
    
        console.log(`✅ Página cambiada a: ${paginaDestino}`);
    
        // 🔥 Notificamos que la página cambió
        document.dispatchEvent(new Event("paginaCambiada"));
    }
}

export default Navegacion;
