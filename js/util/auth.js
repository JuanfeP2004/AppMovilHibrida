import User from '../data/user.js';

class Auth {
    constructor(navegacion) {
        this.navegacion = navegacion;
        this.usuarios = JSON.parse(localStorage.getItem("usuarios"))?.map(user => new User(user.name, user.password, user.pomodoro, user.tareas)) || [];
        this.usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null;
    }

    async registrar(username, password, confirmPassword) {
        if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
            alert("❌ Todos los campos son obligatorios");
            return; // 🔴 Aseguramos que la función termina aquí
        }
        if (password !== confirmPassword) {
            alert("❌ Las contraseñas no coinciden");
            return;
        }
        if (password.length < 4) {
            alert("❌ La contraseña debe tener al menos 4 caracteres");
            return;
        }
        if (this.usuarios.some(user => user.name === username)) {
            alert("❌ El usuario ya existe");
            return;
        }
    
        // ✅ Si pasó todas las validaciones, ahora sí se registra
        const nuevoUsuario = new User(username, password, 0, []);
        this.usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
    
        alert("✅ Registro exitoso");
        this.navegacion.cambiarPaginaString("inicioSesion");
    }

    async login(username, password) {
        if (!username.trim() || !password.trim()) {
            alert("❌ Todos los campos son obligatorios");
            return false;
        }

        const usuario = this.usuarios.find(user => user.name === username);
        if (!usuario || usuario.password !== password) {
            alert("❌ Usuario o contraseña incorrectos");
            return false;
        }

        this.usuarioActual = usuario;
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        alert("✅ Inicio de sesión exitoso");

        this.navegacion.cambiarPaginaString("verHoy");
        return true;
    }

    logout() {
        this.usuarioActual = null;
        localStorage.removeItem("usuarioActual");
        alert("👋 Sesión cerrada");
        this.navegacion.cambiarPaginaString("inicioSesion");
    }

    verificarSesion() {
        if (this.usuarioActual) {
            this.navegacion.cambiarPaginaString("verHoy");
        }
    }

    configurarEventos() {
        console.log("✅ configurarEventos() ha sido llamado");
    
        document.querySelector("#logoutBtn")?.addEventListener("click", () => this.logout());
    
        document.querySelector("#loginBtn")?.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("🔐 Intentando iniciar sesión...");
            const username = document.querySelector("#loginUsername").value.trim();
            const password = document.querySelector("#loginPassword").value.trim();
            this.login(username, password);
        });
    
        document.querySelector("#registerBtn")?.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("🆕 Intentando registrar usuario...");
            const username = document.querySelector("#registerUsername").value.trim();
            const password = document.querySelector("#registerPassword").value.trim();
            const confirmPassword = document.querySelector("#confirmPassword").value.trim();
            this.registrar(username, password, confirmPassword);
        });
    }
    
    
    
}

export default Auth;
