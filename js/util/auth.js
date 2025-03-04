import bcrypt from "bcryptjs";

console.log("🚀 auth.js cargado correctamente");

class Auth {
    constructor(navegacion) {
        this.navegacion = navegacion; // ✅ Guardamos la referencia a `Navegacion`
        this.usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        this.usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null;
    }

    async registrar(username, password, confirmPassword) {
        if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
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

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const nuevoUsuario = { username, password: hashedPassword };
        this.usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
        alert("✅ Registro exitoso");

        this.navegacion.cambiarPagina("inicioSesion"); // ✅ Redirige al login después del registro
        return true;
    }

    async login(username, password) {
        if (!username.trim() || !password.trim()) {
            alert("❌ Todos los campos son obligatorios");
            return false;
        }

        const usuario = this.usuarios.find(user => user.username === username);
        if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
            alert("❌ Usuario o contraseña incorrectos");
            return false;
        }

        this.usuarioActual = usuario;
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        localStorage.setItem("isAuthenticated", "true");
        alert("✅ Inicio de sesión exitoso");

        this.navegacion.cambiarPagina("verHoy"); // ✅ Redirige a la vista principal
        return true;
    }

    logout() {
        this.usuarioActual = null;
        localStorage.removeItem("usuarioActual");
        localStorage.removeItem("isAuthenticated");
        alert("👋 Sesión cerrada");
        this.navegacion.cambiarPagina("inicioSesion"); // ✅ Redirige al login
    }

    configurarEventos() {
        console.log("🔄 Configurando eventos...");

        this.loginForm = document.getElementById("loginForm");
        this.registerForm = document.getElementById("registerForm");

        if (this.loginForm) {
            let btnLogin = this.loginForm.querySelector("button[type='submit']");
            if (btnLogin) {
                btnLogin.replaceWith(btnLogin.cloneNode(true)); // Eliminamos eventos previos
                btnLogin = this.loginForm.querySelector("button[type='submit']");

                btnLogin.addEventListener("click", (event) => {
                    event.preventDefault();
                    console.log("🔐 Intentando iniciar sesión...");

                    const username = document.querySelector("#loginUsername").value.trim();
                    const password = document.querySelector("#loginPassword").value.trim();

                    if (this.login(username, password)) {
                        document.dispatchEvent(new Event("paginaCambiada"));
                    }
                });
            }
        }

        if (this.registerForm) {
            let btnRegister = this.registerForm.querySelector("button[type='submit']");
            if (btnRegister) {
                btnRegister.replaceWith(btnRegister.cloneNode(true)); // Eliminamos eventos previos
                btnRegister = this.registerForm.querySelector("button[type='submit']");

                btnRegister.addEventListener("click", (event) => {
                    event.preventDefault();
                    console.log("🆕 Intentando registrar usuario...");

                    const username = document.querySelector("#registerUsername").value.trim();
                    const password = document.querySelector("#registerPassword").value.trim();
                    const confirmPassword = document.querySelector("#confirmPassword").value.trim();

                    if (this.registrar(username, password, confirmPassword)) {
                        document.dispatchEvent(new Event("paginaCambiada"));
                    }
                });
            }
        }
    }
}

export default Auth;
