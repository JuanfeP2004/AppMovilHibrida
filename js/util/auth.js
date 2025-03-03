console.log("🚀 auth.js cargado correctamente");

class Auth {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        this.usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null;
    }

    

    registrar(username, password, confirmPassword) {
        if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
            alert("❌ Todos los campos son obligatorios");
            return false;
        }
        if (password !== confirmPassword) {
            alert("❌ Las contraseñas no coinciden");
            return false;
        }
        if (this.usuarios.some(user => user.username === username)) {
            alert("❌ El usuario ya existe");
            return false;
        }

        const nuevoUsuario = { username, password };
        this.usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
        alert("✅ Registro exitoso");
        return true;
    }

    login(username, password) {
        if (!username.trim() || !password.trim()) {
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
        alert("✅ Inicio de sesión exitoso");
        return true;
    }

    estaAutenticado() {
        return this.usuarioActual !== null;
    }

    logout() {
        this.usuarioActual = null;
        localStorage.removeItem("usuarioActual");
        alert("👋 Sesión cerrada");
    }
}

export default Auth;
