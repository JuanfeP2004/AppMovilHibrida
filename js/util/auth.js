console.log("🚀 auth.js cargado correctamente");

class Auth {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        this.usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null;
    }

    configurarEventos() {
        console.log("🔄 Configurando eventos de autenticación...");

        const loginForm = document.querySelector("#loginForm");
        const registerForm = document.querySelector("#registerForm");

        if (loginForm) {
            loginForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const username = document.querySelector("#loginUsername").value.trim();
                const password = document.querySelector("#loginPassword").value.trim();

                if (this.login(username, password)) {
                    document.dispatchEvent(new Event("paginaCambiada"));
                }
            });
        }

        if (registerForm) {
            registerForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const username = document.querySelector("#registerUsername").value.trim();
                const password = document.querySelector("#registerPassword").value.trim();
                const confirmPassword = document.querySelector("#confirmPassword").value.trim();

                if (this.registrar(username, password, confirmPassword)) {
                    document.dispatchEvent(new Event("paginaCambiada"));
                }
            });
        }
    }

    registrar(username, password, confirmPassword) {
        if (!username || !password || !confirmPassword) {
            alert("❌ Todos los campos son obligatorios");
            return false;
        }
        if (password !== confirmPassword) {
            alert("❌ Las contraseñas no coinciden");
            return false;
        }
        if (password.length < 4) {
            alert("❌ La contraseña debe tener al menos 4 caracteres");
            return false;
        }
        if (this.usuarios.some(user => user.username === username)) {
            alert("❌ El usuario ya existe");
            return false;
        }

        this.usuarios.push({ username, password });
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
        alert("✅ Registro exitoso");
        return true;
    }

    login(username, password) {
        if (!username || !password) {
            alert("❌ Todos los campos son obligatorios");
            return false;
        }

        const usuario = this.usuarios.find(user => user.username === username && user.password === password);
        if (!usuario) {
            alert("❌ Usuario o contraseña incorrectos");
            return false;
        }

        this.usuarioActual = usuario;
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        localStorage.setItem("isAuthenticated", "true");
        alert("✅ Inicio de sesión exitoso");
        return true;
    }

    estaAutenticado() {
        return localStorage.getItem("isAuthenticated") === "true";
    }

    logout() {
        this.usuarioActual = null;
        localStorage.removeItem("usuarioActual");
        localStorage.removeItem("isAuthenticated");
        alert("👋 Sesión cerrada");
    }
}

export default Auth;
